import { memo, useCallback, useEffect, useRef, useState } from "react";
import { List, type RowComponentProps } from "react-window";
import { useDotNet } from "./hooks/useDotnet";
import {
  useSeedSearchPolling,
  type SearchDebugInfo,
  type SearchProgress,
  type SearchStatusResponse,
} from "./hooks/useSeedSearchPolling";
import { useSeedSearchController } from "./hooks/useSeedSearchController";
import { useThreadSettings } from "./hooks/useThreadSettings";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Switch } from "./components/ui/switch";
import RemixConfiguration from "./components/stardew/remix";
import { ROOM_CONFIGS_1_6 as ROOM_CONFIGS } from "./components/stardew/RoomConfigurations";
import { useRemixConfigState } from "./components/stardew/useRemixConfigState";

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
  const [seeds, setSeeds] = useState<number[]>([]);
  const [useLegacyRandom, setUseLegacyRandom] = useState(false); // live option
  const [maxResultsInput, setMaxResultsInput] = useState("10000");
  const [resultLegacyRandom, setResultLegacyRandom] = useState(false); // what was used for the last search
  const remixConfigState = useRemixConfigState(ROOM_CONFIGS);
  const { dotnet, loading } = useDotNet();
  // worker/threading setup
  const [useAutoWorkers, setUseAutoWorkers] = useState(true);
  const [workerCountInput, setWorkerCountInput] = useState("");
  const threadSettings = useThreadSettings(dotnet);
  // state for search status
  const [searching, setSearching] = useState(false);
  const [activeSearchId, setActiveSearchId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [lastElapsedMs, setLastElapsedMs] = useState<number | null>(null);
  const [debugInfo, setDebugInfo] = useState<SearchDebugInfo | null>(null);
  const [searchProgress, setSearchProgress] = useState<SearchProgress | null>(
    null,
  );
  const searchStartedAtRef = useRef<number | null>(null);

  const clearSearchResults = useCallback(() => {
    setSeeds([]);
    setDebugInfo(null);
  }, []);

  const finalizeSearch = useCallback(() => {
    if (searchStartedAtRef.current !== null) {
      const totalElapsed = performance.now() - searchStartedAtRef.current;
      setElapsedMs(totalElapsed);
      setLastElapsedMs(totalElapsed);
    }

    searchStartedAtRef.current = null;
    setSearching(false);
    setActiveSearchId(null);
    setSearchProgress(null);
  }, []);

  const handlePollingProgress = useCallback((progress: SearchProgress) => {
    setSearchProgress(progress);
    setDebugInfo({
      workersRequested: progress.workersRequested,
      threadsUsed: progress.threadsUsed,
    });
  }, []);

  const handlePollingCompleted = useCallback((status: SearchStatusResponse) => {
    setSeeds(status.seeds ?? []);
    setDebugInfo(status.debug ?? null);

    if (status.status === "cancelled") {
      setError((prev) => prev ?? "Search cancelled.");
    }
  }, []);

  const handlePollingFailed = useCallback(
    (message: string) => {
      setError(message);
      clearSearchResults();
    },
    [clearSearchResults],
  );

  useSeedSearchPolling({
    dotnet,
    searching,
    activeSearchId,
    onProgress: handlePollingProgress,
    onCompleted: handlePollingCompleted,
    onFailed: handlePollingFailed,
    onFinalize: finalizeSearch,
  });

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

  const { runSearch, cancelSearch } = useSeedSearchController({
    dotnet,
    useLegacyRandom,
    maxResultsInput,
    workerCountInput,
    useAutoWorkers,
    maxRequestableWorkers: threadSettings?.maxRequestableWorkers,
    activeSearchId,
    onBeforeStart: () => {
      setSearching(true);
      setActiveSearchId(null);
      setElapsedMs(0);
      setLastElapsedMs(null);
      setError(null);
      setSeeds([]);
      setDebugInfo(null);
      setSearchProgress(null);
      setResultLegacyRandom(useLegacyRandom);
      searchStartedAtRef.current = performance.now();
    },
    onStartSuccess: (searchId, initialDebugInfo) => {
      setDebugInfo(initialDebugInfo);
      setActiveSearchId(searchId);
    },
    onStartError: (message) => {
      setError(message);
      clearSearchResults();
      finalizeSearch();
    },
    onCancelError: () => {
      setError("Could not cancel search.");
    },
  });

  const isBusy = loading || searching;

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 p-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Remixed Bundle Search</h1>
        <p className="text-sm text-muted-foreground">
          Find seeds with specific bundle contents (for version 1.6)
        </p>
      </div>

      <RemixConfiguration roomConfigs={ROOM_CONFIGS} {...remixConfigState} />

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
            <Label htmlFor="max-results-input">Max seeds to return</Label>
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

        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1">
            <Label htmlFor="auto-workers">Use automatic worker count</Label>
            <p className="text-xs text-muted-foreground">
              Use maximum number of threads for your system.
            </p>
          </div>
          <Switch
            id="auto-workers"
            checked={useAutoWorkers}
            disabled={isBusy}
            onCheckedChange={setUseAutoWorkers}
          />
        </div>

        {!useAutoWorkers && (
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
        )}

        <div className="flex items-center gap-3">
          {!searching ? (
            <Button
              disabled={isBusy}
              onClick={() =>
                runSearch({
                  enabledFlags: remixConfigState.payload.enabledFlags,
                  disabledFlags: remixConfigState.payload.disabledFlags,
                  useLegacyRandom,
                  version: "1.6",
                })
              }
            >
              Search bundles
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
                  {searchProgress.processedChunks} chunks scanned (
                  {(
                    (searchProgress.processedChunks /
                      searchProgress.totalChunks) *
                    100
                  ).toFixed(2)}
                  %)
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
      <ResultsPanel numbers={seeds} resultLegacyRandom={resultLegacyRandom} />
    </main>
  );
}

export default App;
