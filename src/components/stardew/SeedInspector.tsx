import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import ToggleButton from "../ui/togglebutton";
import BundleToggle from "./bundleToggle";
import ObjectToggleButton from "./objectToggleButton";
import { useSeedInspector } from "@/hooks/useSeedInspector";

type InspectorLaunchRequest = {
  seed: number;
  useLegacyRandom: boolean;
  source: "url" | "results" | "selector";
};

type SeedInspectorProps = {
  dotnet: unknown;
  roomConfigs: RoomDefinition[];
  launchRequest: InspectorLaunchRequest | null;
  onOpenSearchView: () => void;
};

const parseLegacyParam = (value: string | null): boolean | null => {
  if (value === null) {
    return null;
  }

  const normalized = value.trim().toLowerCase();
  if (normalized === "1" || normalized === "true") {
    return true;
  }

  if (normalized === "0" || normalized === "false") {
    return false;
  }

  return null;
};

const parseSeedParam = (value: string | null): number | null => {
  if (!value) {
    return null;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 0 || parsed > 2147483647) {
    return null;
  }

  return parsed;
};

type BundleInspectSelection = {
  roomName: string;
  bundle: BundleDefinition;
  selectedOptionsByGroup: Array<{
    group: BundleOptionGroup;
    options: BundleItemOption[];
  }>;
};

type RoomInspectSelection = {
  roomName: string;
  bundles: BundleInspectSelection[];
};

const buildRoomSelections = (
  roomConfigs: RoomDefinition[],
  selectedFlags: string[],
) => {
  const selectedFlagSet = new Set(selectedFlags);
  const usedFlags = new Set<string>();
  const rooms: RoomInspectSelection[] = [];

  for (const room of roomConfigs) {
    const bundlesInOrder: BundleDefinition[] = [
      ...room.defaultBundles,
      ...room.optionalBundleGroups.flatMap((group) => group.bundles),
    ];

    const bundleSelections: BundleInspectSelection[] = [];

    for (const bundle of bundlesInOrder) {
      const isBundleSelected = Boolean(
        bundle.flag && selectedFlagSet.has(bundle.flag),
      );

      if (bundle.flag && isBundleSelected) {
        usedFlags.add(bundle.flag);
      }

      const selectedOptionsByGroup = (bundle.optionGroups ?? [])
        .map((group) => {
          const selectedOptions = group.options.filter(
            (option) => option.flag && selectedFlagSet.has(option.flag),
          );

          for (const option of selectedOptions) {
            if (option.flag) {
              usedFlags.add(option.flag);
            }
          }

          return {
            group,
            options: selectedOptions,
          };
        })
        .filter((entry) => entry.options.length > 0);

      if (!isBundleSelected && selectedOptionsByGroup.length === 0) {
        continue;
      }

      bundleSelections.push({
        roomName: room.room,
        bundle,
        selectedOptionsByGroup,
      });
    }

    if (bundleSelections.length > 0) {
      rooms.push({
        roomName: room.room,
        bundles: bundleSelections,
      });
    }
  }

  const ungroupedFlags = selectedFlags.filter((flag) => !usedFlags.has(flag));

  return {
    rooms,
    ungroupedFlags,
  };
};

const setInspectQuery = (seed: number, useLegacyRandom: boolean) => {
  if (typeof window === "undefined") {
    return;
  }

  const url = new URL(window.location.href);
  url.searchParams.set("view", "inspect");
  url.searchParams.set("seed", String(seed));
  url.searchParams.set("legacy", useLegacyRandom ? "1" : "0");
  window.history.replaceState({}, "", url);
};

export default function SeedInspector({
  dotnet,
  roomConfigs,
  launchRequest,
}: SeedInspectorProps) {
  const { status, error, result, inspectSeed } = useSeedInspector(dotnet);
  const [seedInput, setSeedInput] = useState("");
  const [useLegacyRandom, setUseLegacyRandom] = useState(false);

  const runInspect = useCallback(
    async (seed: number, legacy: boolean, preserveScroll = false) => {
      const scrollY = preserveScroll ? window.scrollY : null;
      setSeedInput(String(seed));
      setUseLegacyRandom(legacy);
      setInspectQuery(seed, legacy);
      await inspectSeed(seed, legacy);

      if (scrollY !== null) {
        window.requestAnimationFrame(() => {
          window.scrollTo({ top: scrollY });
        });
      }
    },
    [inspectSeed],
  );

  useEffect(() => {
    if (launchRequest) {
      const timeoutId = window.setTimeout(() => {
        void runInspect(launchRequest.seed, launchRequest.useLegacyRandom);
      }, 0);

      return () => window.clearTimeout(timeoutId);
    }
  }, [launchRequest, runInspect]);

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const seedFromQuery = parseSeedParam(search.get("seed"));
    const legacyFromQuery = parseLegacyParam(search.get("legacy"));

    if (seedFromQuery === null) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      void runInspect(seedFromQuery, legacyFromQuery ?? false);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [runInspect]);

  const roomSelections = useMemo(() => {
    if (!result) {
      return { rooms: [], ungroupedFlags: [] };
    }

    return buildRoomSelections(roomConfigs, result.selectedFlags);
  }, [result, roomConfigs]);

  const inspectFromInput = async () => {
    const parsedSeed = parseSeedParam(seedInput);
    if (parsedSeed === null) {
      return;
    }

    await runInspect(parsedSeed, useLegacyRandom);
  };
  const handleInspectSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void inspectFromInput();
  };

  const isSeedInputValid = parseSeedParam(seedInput) !== null;

  return (
    <div className="space-y-6">
      <section className="space-y-4 rounded-xl border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium">Seed Inspector</h2>
            <p className="text-sm text-muted-foreground">
              Inspect remixed bundle flags for a specific seed.
            </p>
          </div>
        </div>

        <form
          className="grid gap-4 sm:grid-cols-2"
          onSubmit={handleInspectSubmit}
        >
          {/* <div className="grid gap-4 sm:grid-cols-2"> */}
          <div className="space-y-2">
            <Label htmlFor="inspect-seed-input">Seed</Label>
            <Input
              id="inspect-seed-input"
              value={seedInput}
              onChange={(event) => setSeedInput(event.target.value)}
              placeholder="Enter a seed"
              type="number"
              min={0}
              max={2147483647}
            />
            {!isSeedInputValid && seedInput.trim() ? (
              <p className="text-sm text-destructive">
                Seed must be an integer between 0 and 2147483647.
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="inspect-legacy-random">Legacy random</Label>
            <ToggleButton
              id="inspect-legacy-random"
              pressState={useLegacyRandom}
              onClick={() => setUseLegacyRandom((prev) => !prev)}
              onLabel="Legacy RNG"
              offLabel="New RNG"
            />
          </div>
          {/* </div> */}

          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="submit"
              disabled={!isSeedInputValid || status === "loading"}
            >
              {status === "loading" ? "Inspecting..." : "Inspect Seed"}
            </Button>
          </div>
        </form>
      </section>

      <section className="space-y-3 rounded-xl border bg-card p-4 shadow-sm">
        <h3 className="text-base font-medium">Selected Bundles and Items</h3>
        <h4 className="text-base font-medium text-muted-foreground">
          {`Seed: ${result !== null ? result.seed : "null"} Random: ${result !== null && result.useLegacyRandom ? "Legacy RNG" : "New RNG"}`}
        </h4>
        {status === "error" && error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : null}

        {status === "idle" ? (
          <p className="text-sm text-muted-foreground">
            Enter or select a seed to inspect.
          </p>
        ) : null}

        {status === "success" && roomSelections.rooms.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No selected bundles or item selections found.
          </p>
        ) : null}

        {status === "success" && roomSelections.rooms.length > 0 ? (
          <div className="space-y-3">
            {roomSelections.rooms.map((room) => (
              <section key={room.roomName} className="rounded-md border p-3">
                <h4 className="font-medium">{room.roomName}</h4>

                <div className="mt-2 space-y-3">
                  {room.bundles.map((selection) => (
                    <div
                      key={`${room.roomName}-${selection.bundle.id}`}
                      className="rounded-md border border-dashed p-2"
                    >
                      <div className="grid grid-cols-[auto_1fr] gap-2 sm:grid-cols-[auto_11rem_1fr] sm:items-center">
                        <BundleToggle
                          room={selection.roomName}
                          bundleId={selection.bundle.id}
                          size={48}
                          className="pointer-events-none"
                        />
                        <span className="text-sm font-medium sm:w-44">
                          {selection.bundle.name}
                        </span>

                        <div className="col-span-2 flex flex-wrap items-center gap-2 sm:col-span-1">
                          {selection.selectedOptionsByGroup
                            .flatMap((groupData) => groupData.options)
                            .map((option) =>
                              option.objectId ? (
                                <ObjectToggleButton
                                  key={`${selection.bundle.id}-${option.id}`}
                                  objectId={option.objectId}
                                  size={32}
                                  className="pointer-events-none p-1"
                                />
                              ) : (
                                <span
                                  key={`${selection.bundle.id}-${option.id}`}
                                  className="rounded-md border bg-muted px-1.5 py-0.5 text-xs"
                                >
                                  {option.label}
                                </span>
                              ),
                            )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {roomSelections.ungroupedFlags.length > 0 ? (
              <section className="rounded-md border p-3">
                <h4 className="font-medium">Ungrouped Flags</h4>
                <ul className="mt-2 list-disc pl-5 text-sm">
                  {roomSelections.ungroupedFlags.map((flag) => (
                    <li key={flag}>{flag}</li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        ) : null}
      </section>
    </div>
  );
}
