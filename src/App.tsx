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
import RemixConfiguration from "./components/stardew/remix";
import { ROOM_CONFIGS_1_6 as ROOM_CONFIGS } from "./components/stardew/RoomConfigurations";
import { useRemixConfigState } from "./components/stardew/useRemixConfigState";
import ToggleButton from "./components/ui/togglebutton";

const RESULTS_LIST_HEIGHT = 320;
const RESULTS_ROW_HEIGHT = 44;

type ResultsPanelProps = {
  numbers: number[];
  resultLegacyRandom: boolean;
  searchPayload: Record<string, unknown>;
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
    <div style={style} className="border-b px-3 py-2 text-base last:border-b-0">
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
  searchPayload,
}: ResultsPanelProps) {
  const downloadResultsJson = () => {
    const now = new Date();
    const pad = (value: number) => String(value).padStart(2, "0");
    const timestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;

    const exportData = {
      generatedAtLocal: now.toString(),
      searchPayload,
      results: numbers,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `seed-search-${timestamp}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="space-y-2 rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-medium">Results ({numbers.length})</h2>
        <Button variant="outline" onClick={downloadResultsJson}>
          Download JSON
        </Button>
      </div>
      <div className="text-sm text-muted-foreground">
        Click a seed to view it in MouseyPounds
      </div>
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
  const currentSearchPayload = {
    enabledFlags: remixConfigState.payload.enabledFlags,
    disabledFlags: remixConfigState.payload.disabledFlags,
    useLegacyRandom,
    version: "1.6",
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold">Remixed Bundle Search</h1>
        <p className="text-base text-muted-foreground">
          Find seeds with specific bundle contents (for version 1.6). Left click
          to select an option, right click to disable an option. If a section
          has less than the pick limit selected:
          <ul className="list-disc pl-6">
            <li>selected bundles will be guaranteed to be in the solution</li>
            <li>
              disabled bundles will be guaranteed to NOT be in the solution
            </li>
            <li>
              {" "}
              any bundles not selected or disabled will be treated as "don't
              care"
            </li>
          </ul>
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[minmax(0,1.6fr)_minmax(340px,1fr)]">
        <div className="min-w-0">
          <RemixConfiguration
            roomConfigs={ROOM_CONFIGS}
            {...remixConfigState}
          />
        </div>

        <div className="min-w-0">
          <div className="space-y-6">
            <div className="space-y-6">
              <section className="space-y-4 rounded-xl border bg-card p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="legacy-random">Legacy random</Label>
                    <p className="text-sm text-muted-foreground">
                      Whether you want to use Legacy RNG (pseudo v1.5) or New
                      RNG (v1.6+) (see the checkbox on character creation)
                    </p>
                  </div>
                  <ToggleButton
                    id="legacy-random"
                    pressState={useLegacyRandom}
                    disabled={isBusy}
                    onClick={() => setUseLegacyRandom((prev) => !prev)}
                    onLabel={"Legacy RNG"}
                    offLabel={"New RNG"}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="max-results-input">
                      Max seeds to return
                    </Label>
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
                <section className="space-y-2">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-md border bg-card px-3 py-2 text-left shadow-sm transition-colors hover:bg-muted"
                    onClick={() =>
                      remixConfigState.setIsPreviewExpanded((prev) => !prev)
                    }
                    aria-expanded={remixConfigState.isPreviewExpanded}
                  >
                    <h3 className="text-sm font-semibold">Payload Preview</h3>
                    <span className="text-sm text-muted-foreground">
                      {remixConfigState.isPreviewExpanded
                        ? "Collapse"
                        : "Expand"}
                    </span>
                  </button>

                  {!remixConfigState.isPreviewExpanded ? null : (
                    <>
                      <p className="text-sm text-muted-foreground">
                        Payload that will be run
                      </p>
                      <pre className="max-h-80 overflow-auto rounded-md bg-muted p-3 text-sm">
                        {JSON.stringify(
                          {
                            enabledFlags: remixConfigState.payload.enabledFlags,
                            disabledFlags:
                              remixConfigState.payload.disabledFlags,
                            useLegacyRandom,
                            version: "1.6",
                          },
                          null,
                          2,
                        )}
                      </pre>
                    </>
                  )}
                </section>

                <div className="flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="auto-workers">Automatic Worker Count</Label>
                    <p className="text-sm text-muted-foreground">
                      When on, use the maximum number of threads for your
                      system. When off, you can specify the number of workers.
                    </p>
                  </div>
                  <ToggleButton
                    id="auto-workers"
                    onLabel="On"
                    offLabel="Off"
                    pressState={useAutoWorkers}
                    disabled={isBusy}
                    onClick={() => setUseAutoWorkers((prev) => !prev)}
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
                        threadSettings
                          ? `${threadSettings.defaultWorkers}`
                          : "Auto"
                      }
                      value={workerCountInput}
                      onChange={(e) => setWorkerCountInput(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      {useAutoWorkers
                        ? "Auto mode is enabled."
                        : "Manual mode is enabled."}
                      {threadSettings
                        ? ` Max requestable: ${threadSettings.maxRequestableWorkers}.`
                        : ""}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  {!searching ? (
                    <Button
                      disabled={isBusy}
                      onClick={() => runSearch(currentSearchPayload)}
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
                        <>
                          <p className="text-sm text-muted-foreground">
                            Progress: {searchProgress.seedsFound} seeds found
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {searchProgress.processedChunks} chunks scanned (
                            {(
                              (searchProgress.processedChunks /
                                searchProgress.totalChunks) *
                              100
                            ).toFixed(2)}
                            %)
                          </p>
                        </>
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

              {error ? (
                <p className="text-sm text-destructive">{error}</p>
              ) : null}

              {debugInfo && activeSearchId ? (
                <section className="space-y-2 rounded-xl border bg-card p-4 text-sm shadow-sm">
                  <h2 className="font-medium">Thread Usage</h2>
                  <p className="text-muted-foreground">
                    Threads used: {debugInfo.threadsUsed} / requested{" "}
                    {debugInfo.workersRequested}
                  </p>
                </section>
              ) : null}
            </div>

            <div>
              <ResultsPanel
                numbers={seeds}
                resultLegacyRandom={resultLegacyRandom}
                searchPayload={currentSearchPayload}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
