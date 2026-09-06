import { useCallback, useState } from "react";

type InspectSeedRemixExport = (
  seed: number,
  useLegacyRandom: boolean,
  version: string,
) => Promise<string>;

type DotnetSearchFunctions = {
  InspectRemixSeed?: InspectSeedRemixExport;
};

type DotnetExports = {
  SeedFinding?: {
    SearchFunctions?: DotnetSearchFunctions;
  };
};

export type InspectSeedSuccess = {
  status: "ok";
  seed: number;
  useLegacyRandom: boolean;
  version: string;
  selectedFlags: string[];
};

type InspectSeedFailure = {
  status: "invalid_seed" | "unsupported_version" | "failed";
  error?: string;
};

type InspectSeedResponse = InspectSeedSuccess | InspectSeedFailure;

type InspectorState = {
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
  result: InspectSeedSuccess | null;
};

const INITIAL_STATE: InspectorState = {
  status: "idle",
  error: null,
  result: null,
};

export const useSeedInspector = (dotnet: unknown) => {
  const [state, setState] = useState<InspectorState>(INITIAL_STATE);

  const inspectSeed = useCallback(
    async (seed: number, useLegacyRandom: boolean, version = "1.6") => {
      setState((prev) => ({ ...prev, status: "loading", error: null }));

      try {
        const searchFunctions = (dotnet as DotnetExports | null | undefined)
          ?.SeedFinding?.SearchFunctions;
        if (!searchFunctions || typeof searchFunctions.InspectRemixSeed !== "function") {
          throw new Error(
            "Search API export 'InspectRemixSeed' was not found. Rebuild sdv-plugin and hard refresh the browser.",
          );
        }

        const raw = (await searchFunctions.InspectRemixSeed(
          seed,
          useLegacyRandom,
          version,
        )) as string;
        const parsed = JSON.parse(raw) as InspectSeedResponse;

        if (parsed.status !== "ok") {
          setState({
            status: "error",
            error: parsed.error ?? "Could not inspect this seed.",
            result: null,
          });
          return null;
        }

        setState({
          status: "success",
          error: null,
          result: parsed,
        });

        return parsed;
      } catch (error) {
        const details = error instanceof Error ? error.message : String(error);
        setState({
          status: "error",
          error: `Could not inspect seed: ${details}`,
          result: null,
        });
        return null;
      }
    },
    [dotnet],
  );

  const resetInspector = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return {
    ...state,
    inspectSeed,
    resetInspector,
  };
};
