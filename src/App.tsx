import { memo, useEffect, useRef, useState } from "react";
import { List, type RowComponentProps } from "react-window";
import { useDotNet } from "./hooks/useDotnet";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Switch } from "./components/ui/switch";

type SearchDebugInfo = {
  workersRequested: number;
  threadsUsed: number;
};

type StartSearchResponse = {
  status: "started" | "failed";
  searchId?: string;
  workersRequested?: number;
  error?: string;
};

type SearchProgress = {
  seedsFound: number;
  processedChunks: number;
  workersRequested: number;
  threadsUsed: number;
};

type SearchStatusResponse = {
  status: "running" | "completed" | "cancelled" | "failed" | "not_found";
  seeds?: number[];
  debug?: SearchDebugInfo;
  progress?: SearchProgress;
  error?: string;
};

type ThreadSettings = {
  maxRequestableWorkers: number;
  defaultWorkers: number;
};

const RESULTS_LIST_HEIGHT = 320;
const RESULTS_ROW_HEIGHT = 36;

type ResultsPanelProps = {
  numbers: number[];
  resultLegacyRandom: boolean;
};

type ResultsRowData = {
  numbers: number[];
  resultLegacyRandom: boolean;
};

function ResultsRow({
  index,
  style,
  numbers,
  resultLegacyRandom,
}: RowComponentProps<ResultsRowData>) {
  const n = numbers[index];
  const href = `https://mouseypounds.github.io/stardew-predictor/?id=${n}&leg=${resultLegacyRandom ? 1 : 0}`;

  return (
    <div style={style} className="border-b px-3 py-2 text-sm last:border-b-0">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline-offset-4 hover:underline"
      >
        {n}
      </a>
    </div>
  );
}

const ResultsPanel = memo(function ResultsPanel({
  numbers,
  resultLegacyRandom,
}: ResultsPanelProps) {
  return (
    <section className="space-y-3 rounded-xl border bg-card p-4 shadow-sm">
      <h2 className="text-base font-medium">Results ({numbers.length})</h2>
      <div className="rounded-md border">
        {numbers.length === 0 ? (
          <p className="p-3 text-sm text-muted-foreground">No seeds yet.</p>
        ) : (
          <List
            rowCount={numbers.length}
            rowHeight={RESULTS_ROW_HEIGHT}
            rowComponent={ResultsRow}
            rowProps={{ numbers, resultLegacyRandom }}
            style={{ height: RESULTS_LIST_HEIGHT, width: "100%" }}
          />
        )}
      </div>
    </section>
  );
});

function App() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [useLegacyRandom, setUseLegacyRandom] = useState(false);
  const [dayInput, setDayInput] = useState("2");
  const [maxResultsInput, setMaxResultsInput] = useState("10000");
  const [useAutoWorkers, setUseAutoWorkers] = useState(true);
  const [workerCountInput, setWorkerCountInput] = useState("");
  const [threadSettings, setThreadSettings] = useState<ThreadSettings | null>(
    null,
  );
  const [searching, setSearching] = useState(false);
  const [activeSearchId, setActiveSearchId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [lastElapsedMs, setLastElapsedMs] = useState<number | null>(null);
  const [resultLegacyRandom, setResultLegacyRandom] = useState(false);
  const [debugInfo, setDebugInfo] = useState<SearchDebugInfo | null>(null);
  const [searchProgress, setSearchProgress] = useState<SearchProgress | null>(
    null,
  );
  const pollInFlightRef = useRef(false);
  const searchStartedAtRef = useRef<number | null>(null);

  const { dotnet, loading } = useDotNet(
    "/sdv-plugin/bin/Debug/net10.0/browser-wasm/AppBundle/_framework/dotnet.js",
  );

  useEffect(() => {
    if (!searching) {
      return;
    }

    if (searchStartedAtRef.current === null) {
      searchStartedAtRef.current = performance.now();
    }

    const interval = window.setInterval(() => {
      if (searchStartedAtRef.current !== null) {
        setElapsedMs(performance.now() - searchStartedAtRef.current);
      }
    }, 50);

    return () => window.clearInterval(interval);
  }, [searching]);

  useEffect(() => {
    if (!dotnet) {
      return;
    }

    const loadThreadSettings = async () => {
      try {
        const result =
          (await dotnet.SeedFinding.SearchFunctions.GetThreadSettings()) as string;
        const parsed = JSON.parse(result) as ThreadSettings;
        setThreadSettings(parsed);
      } catch {
        setThreadSettings(null);
      }
    };

    void loadThreadSettings();
  }, [dotnet]);

  useEffect(() => {
    if (!dotnet || !searching || !activeSearchId) {
      return;
    }

    const finalizeSearch = () => {
      if (searchStartedAtRef.current !== null) {
        const totalElapsed = performance.now() - searchStartedAtRef.current;
        setElapsedMs(totalElapsed);
        setLastElapsedMs(totalElapsed);
      }
      searchStartedAtRef.current = null;
      setSearching(false);
      setActiveSearchId(null);
      setSearchProgress(null);
    };

    const interval = window.setInterval(async () => {
      if (pollInFlightRef.current) {
        return;
      }

      pollInFlightRef.current = true;
      try {
        const searchFunctions = dotnet?.SeedFinding?.SearchFunctions;
        if (
          !searchFunctions ||
          typeof searchFunctions.GetFairySeedSearchStatus !== "function"
        ) {
          throw new Error(
            "Search API export 'GetFairySeedSearchStatus' was not found. Rebuild sdv-plugin and hard refresh the browser.",
          );
        }

        const statusRaw = (await searchFunctions.GetFairySeedSearchStatus(
          activeSearchId,
        )) as string;
        const status = JSON.parse(statusRaw) as SearchStatusResponse;

        if (status.status === "running") {
          if (status.progress) {
            setSearchProgress(status.progress);
            setDebugInfo({
              workersRequested: status.progress.workersRequested,
              threadsUsed: status.progress.threadsUsed,
            });
          }
          return;
        }

        if (status.status === "completed" || status.status === "cancelled") {
          setNumbers(status.seeds ?? []);
          setDebugInfo(status.debug ?? null);
          if (status.status === "cancelled" && !error) {
            setError("Search cancelled.");
          }
          finalizeSearch();
          return;
        }

        if (status.status === "failed") {
          setNumbers([]);
          setDebugInfo(null);
          setError(status.error ?? "Search failed.");
          finalizeSearch();
          return;
        }

        setNumbers([]);
        setDebugInfo(null);
        setError("Search not found or expired.");
        finalizeSearch();
      } catch (err) {
        const details = err instanceof Error ? err.message : String(err);
        setError(`Could not poll search status: ${details}`);
        setNumbers([]);
        setDebugInfo(null);
        finalizeSearch();
      } finally {
        pollInFlightRef.current = false;
      }
    }, 200);

    return () => {
      window.clearInterval(interval);
    };
  }, [dotnet, searching, activeSearchId, error]);

  const runSearch = async () => {
    if (!dotnet) {
      return;
    }

    setSearching(true);
    setActiveSearchId(null);
    setElapsedMs(0);
    setLastElapsedMs(null);
    setError(null);
    setNumbers([]);
    setDebugInfo(null);
    setSearchProgress(null);
    setResultLegacyRandom(useLegacyRandom);
    searchStartedAtRef.current = performance.now();

    // Allow the UI to paint the loading state before starting heavy work.
    await new Promise<void>((resolve) =>
      window.requestAnimationFrame(() => resolve()),
    );

    try {
      const searchFunctions = dotnet?.SeedFinding?.SearchFunctions;
      if (
        !searchFunctions ||
        typeof searchFunctions.StartFairySeedSearch !== "function"
      ) {
        throw new Error(
          "Search API export 'StartFairySeedSearch' was not found. Rebuild sdv-plugin and hard refresh the browser.",
        );
      }

      const parsedDay = Number(dayInput);
      const parsedMaxResults = Number(maxResultsInput);
      const safeDay = Math.max(
        1,
        Number.isFinite(parsedDay) ? Math.trunc(parsedDay) : 1,
      );
      const safeMaxResults = Math.max(
        1,
        Number.isFinite(parsedMaxResults) ? Math.trunc(parsedMaxResults) : 1,
      );

      const parsedWorkers = Number(workerCountInput);
      const requestedWorkers = useAutoWorkers
        ? 0
        : workerCountInput.trim()
          ? Number.isFinite(parsedWorkers)
            ? Math.trunc(parsedWorkers)
            : 0
          : 0;

      const safeRequestedWorkers = threadSettings
        ? Math.min(
            Math.max(requestedWorkers, 0),
            threadSettings.maxRequestableWorkers,
          )
        : Math.max(requestedWorkers, 0);

      const startRaw = (await searchFunctions.StartFairySeedSearch(
        useLegacyRandom,
        safeDay,
        safeMaxResults,
        safeRequestedWorkers,
      )) as string;
      const startResponse = JSON.parse(startRaw) as StartSearchResponse;

      if (startResponse.status !== "started" || !startResponse.searchId) {
        throw new Error(startResponse.error ?? "Failed to start search.");
      }

      setDebugInfo({
        workersRequested: startResponse.workersRequested ?? 0,
        threadsUsed: 0,
      });
      setActiveSearchId(startResponse.searchId);
    } catch (err) {
      const details = err instanceof Error ? err.message : String(err);
      setError(`Could not start fairy seed search: ${details}`);
      setNumbers([]);
      setDebugInfo(null);
      setActiveSearchId(null);
      setSearching(false);
      if (searchStartedAtRef.current !== null) {
        const totalElapsed = performance.now() - searchStartedAtRef.current;
        setElapsedMs(totalElapsed);
        setLastElapsedMs(totalElapsed);
      }
      searchStartedAtRef.current = null;
    }
  };

  const cancelSearch = async () => {
    if (!dotnet || !activeSearchId) {
      return;
    }

    try {
      const searchFunctions = dotnet?.SeedFinding?.SearchFunctions;
      if (
        !searchFunctions ||
        typeof searchFunctions.CancelFairySeedSearch !== "function"
      ) {
        throw new Error(
          "Search API export 'CancelFairySeedSearch' was not found. Rebuild sdv-plugin and hard refresh the browser.",
        );
      }

      await searchFunctions.CancelFairySeedSearch(activeSearchId);
    } catch {
      setError("Could not cancel search.");
    }
  };

  const isBusy = loading || searching;

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 p-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Fairy Seed Finder</h1>
        <p className="text-sm text-muted-foreground">
          Select search options and find seeds that trigger a fairy event.
        </p>
      </div>

      <section className="space-y-4 rounded-xl border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1">
            <Label htmlFor="auto-workers">Use automatic worker count</Label>
            <p className="text-xs text-muted-foreground">
              Auto uses the runtime default worker count.
            </p>
          </div>
          <Switch
            id="auto-workers"
            checked={useAutoWorkers}
            disabled={isBusy}
            onCheckedChange={setUseAutoWorkers}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="worker-count-input">Worker threads</Label>
          <Input
            id="worker-count-input"
            disabled={isBusy || useAutoWorkers}
            type="number"
            min={1}
            max={threadSettings?.maxRequestableWorkers}
            placeholder={
              threadSettings ? `${threadSettings.defaultWorkers}` : "Auto"
            }
            value={workerCountInput}
            onChange={(e) => setWorkerCountInput(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            {useAutoWorkers
              ? "Auto mode is enabled."
              : "Manual mode is enabled."}
            {threadSettings
              ? ` Max requestable: ${threadSettings.maxRequestableWorkers}.`
              : ""}
          </p>
        </div>
      </section>

      <section className="space-y-4 rounded-xl border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1">
            <Label htmlFor="legacy-random">Use legacy random</Label>
            <p className="text-xs text-muted-foreground">
              Enable pre-1.6 random behavior for event calculation.
            </p>
          </div>
          <Switch
            id="legacy-random"
            checked={useLegacyRandom}
            disabled={isBusy}
            onCheckedChange={setUseLegacyRandom}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="day-input">Day</Label>
            <Input
              id="day-input"
              disabled={isBusy}
              type="number"
              min={1}
              value={dayInput}
              onChange={(e) => setDayInput(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="max-results-input">Max fairy seeds</Label>
            <Input
              id="max-results-input"
              disabled={isBusy}
              type="number"
              min={1}
              max={1000}
              value={maxResultsInput}
              onChange={(e) => setMaxResultsInput(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!searching ? (
            <Button disabled={isBusy} onClick={runSearch}>
              Find Fairy Seeds
            </Button>
          ) : (
            <Button
              variant="outline"
              disabled={!activeSearchId}
              onClick={cancelSearch}
            >
              Cancel Search
            </Button>
          )}
          {searching ? (
            <div className="space-y-0.5">
              <p className="text-sm text-muted-foreground">
                Elapsed: {(elapsedMs / 1000).toFixed(1)}s
              </p>
              {searchProgress ? (
                <p className="text-xs text-muted-foreground">
                  Progress: {searchProgress.seedsFound} seeds found,{" "}
                  {searchProgress.processedChunks} chunks scanned
                </p>
              ) : null}
            </div>
          ) : null}
          {!searching && lastElapsedMs !== null ? (
            <p className="text-sm text-muted-foreground">
              Last search: {(lastElapsedMs / 1000).toFixed(2)}s
            </p>
          ) : null}
        </div>
      </section>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      {debugInfo ? (
        <section className="space-y-2 rounded-xl border bg-card p-4 text-sm shadow-sm">
          <h2 className="font-medium">Thread Usage</h2>
          <p className="text-muted-foreground">
            Threads used: {debugInfo.threadsUsed} / requested{" "}
            {debugInfo.workersRequested}
          </p>
        </section>
      ) : null}
      <ResultsPanel numbers={numbers} resultLegacyRandom={resultLegacyRandom} />
    </main>
  );
}

export default App;
