import { useCallback } from "react";
import type { SearchDebugInfo } from "./useSeedSearchPolling";

type StartSearchResponse = {
  status: "started" | "failed";
  searchId?: string;
  workersRequested?: number;
  error?: string;
};

type UseSeedSearchControllerArgs = {
  dotnet: any;
  useLegacyRandom: boolean;
  maxResultsInput: string;
  workerCountInput: string;
  useAutoWorkers: boolean;
  maxRequestableWorkers?: number;
  activeSearchId: string | null;
  onBeforeStart: () => void;
  onStartSuccess: (searchId: string, debugInfo: SearchDebugInfo) => void;
  onStartError: (message: string) => void;
  onCancelError: () => void;
};

const normalizeMaxResults = (raw: string): number => {
  const parsed = Number(raw);
  return Math.max(1, Number.isFinite(parsed) ? Math.trunc(parsed) : 1);
};

const normalizeRequestedWorkers = (
  workerCountInput: string,
  useAutoWorkers: boolean,
  maxRequestableWorkers?: number,
): number => {
  if (useAutoWorkers) {
    return 0;
  }

  const parsedWorkers = Number(workerCountInput);
  const requestedWorkers = workerCountInput.trim()
    ? Number.isFinite(parsedWorkers)
      ? Math.trunc(parsedWorkers)
      : 0
    : 0;
  const clampedWorkers = Math.max(requestedWorkers, 0);

  return typeof maxRequestableWorkers === "number"
    ? Math.min(clampedWorkers, maxRequestableWorkers)
    : clampedWorkers;
};

export function useSeedSearchController({
  dotnet,
  useLegacyRandom,
  maxResultsInput,
  workerCountInput,
  useAutoWorkers,
  maxRequestableWorkers,
  activeSearchId,
  onBeforeStart,
  onStartSuccess,
  onStartError,
  onCancelError,
}: UseSeedSearchControllerArgs) {
  const getSearchFunctionsOrThrow = useCallback(() => {
    const searchFunctions = dotnet?.SeedFinding?.SearchFunctions;
    if (!searchFunctions) {
      throw new Error(
        "Search API exports were not found. Rebuild sdv-plugin and hard refresh the browser.",
      );
    }

    return searchFunctions;
  }, [dotnet]);

  const runSearch = useCallback(
    async (payload: any) => {
      if (!dotnet) {
        return;
      }

      onBeforeStart();

      // Allow the UI to paint the loading state before starting heavy work.
      await new Promise<void>((resolve) =>
        window.requestAnimationFrame(() => resolve()),
      );

      try {
        const searchFunctions = getSearchFunctionsOrThrow();
        if (typeof searchFunctions.StartSeedSearch !== "function") {
          throw new Error(
            "Search API export 'StartSeedSearch' was not found. Rebuild sdv-plugin and hard refresh the browser.",
          );
        }

        const safeMaxResults = normalizeMaxResults(maxResultsInput);
        const safeRequestedWorkers = normalizeRequestedWorkers(
          workerCountInput,
          useAutoWorkers,
          maxRequestableWorkers,
        );
        const searchJson = JSON.stringify(payload);

        const startRaw = (await searchFunctions.StartSeedSearch(
          searchJson,
          safeMaxResults,
          safeRequestedWorkers,
        )) as string;
        const startResponse = JSON.parse(startRaw) as StartSearchResponse;

        if (startResponse.status !== "started" || !startResponse.searchId) {
          throw new Error(startResponse.error ?? "Failed to start search.");
        }

        onStartSuccess(startResponse.searchId, {
          workersRequested: startResponse.workersRequested ?? 0,
          threadsUsed: 0,
        });
      } catch (err) {
        const details = err instanceof Error ? err.message : String(err);
        onStartError(`Could not start seed search: ${details}`);
      }
    },
    [
      dotnet,
      getSearchFunctionsOrThrow,
      maxRequestableWorkers,
      maxResultsInput,
      onBeforeStart,
      onStartError,
      onStartSuccess,
      useAutoWorkers,
      useLegacyRandom,
      workerCountInput,
    ],
  );

  const cancelSearch = useCallback(async () => {
    if (!dotnet || !activeSearchId) {
      return;
    }

    try {
      const searchFunctions = getSearchFunctionsOrThrow();
      if (typeof searchFunctions.CancelSeedSearch !== "function") {
        throw new Error(
          "Search API export 'CancelSeedSearch' was not found. Rebuild sdv-plugin and hard refresh the browser.",
        );
      }

      await searchFunctions.CancelSeedSearch(activeSearchId);
    } catch {
      onCancelError();
    }
  }, [activeSearchId, dotnet, getSearchFunctionsOrThrow, onCancelError]);

  return {
    runSearch,
    cancelSearch,
  };
}
