import { useEffect, useRef } from "react";

export type SearchDebugInfo = {
  workersRequested: number;
  threadsUsed: number;
};

export type SearchProgress = {
  seedsFound: number;
  processedChunks: number;
  totalChunks: number;
  workersRequested: number;
  threadsUsed: number;
};

export type SearchStatusResponse = {
  status: "running" | "completed" | "cancelled" | "failed" | "not_found";
  seeds?: number[];
  debug?: SearchDebugInfo;
  progress?: SearchProgress;
  error?: string;
};

type UseSeedSearchPollingArgs = {
  dotnet: any;
  searching: boolean;
  activeSearchId: string | null;
  onProgress: (progress: SearchProgress) => void;
  onCompleted: (status: SearchStatusResponse) => void;
  onFailed: (message: string) => void;
  onFinalize: () => void;
};

export function useSeedSearchPolling({
  dotnet,
  searching,
  activeSearchId,
  onProgress,
  onCompleted,
  onFailed,
  onFinalize,
}: UseSeedSearchPollingArgs) {
  const pollInFlightRef = useRef(false);

  useEffect(() => {
    if (!dotnet || !searching || !activeSearchId) {
      return;
    }

    const interval = window.setInterval(async () => {
      if (pollInFlightRef.current) {
        return;
      }

      pollInFlightRef.current = true;
      try {
        const searchFunctions = dotnet?.SeedFinding?.SearchFunctions;
        if (
          !searchFunctions ||
          typeof searchFunctions.GetSeedSearchStatus !== "function"
        ) {
          throw new Error(
            "Search API export 'GetSeedSearchStatus' was not found. Rebuild sdv-plugin and hard refresh the browser.",
          );
        }

        const statusRaw = (await searchFunctions.GetSeedSearchStatus(
          activeSearchId,
        )) as string;
        const status = JSON.parse(statusRaw) as SearchStatusResponse;

        if (status.status === "running") {
          if (status.progress) {
            onProgress(status.progress);
          }
          return;
        }

        if (status.status === "completed" || status.status === "cancelled") {
          onCompleted(status);
          onFinalize();
          return;
        }

        if (status.status === "failed") {
          onFailed(status.error ?? "Search failed.");
          onFinalize();
          return;
        }

        onFailed("Search not found or expired.");
        onFinalize();
      } catch (err) {
        const details = err instanceof Error ? err.message : String(err);
        onFailed(`Could not poll search status: ${details}`);
        onFinalize();
      } finally {
        pollInFlightRef.current = false;
      }
    }, 200);

    return () => {
      window.clearInterval(interval);
    };
  }, [
    activeSearchId,
    dotnet,
    onCompleted,
    onFailed,
    onFinalize,
    onProgress,
    searching,
  ]);
}
