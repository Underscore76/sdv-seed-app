import BundleToggle from "./bundleToggle";
import BundleOptionGroups from "./BundleOptionGroups";
import SpriteBox from "./SpriteBox";
import JunimoNote from "@/assets/stardew/JunimoNote.png";
import type { RemixConfigState } from "./useRemixConfigState";

type RemixConfigurationProps = RemixConfigState & {
  roomConfigs: RoomDefinition[];
};

export default function RemixConfiguration({
  roomConfigs,
  selectedOptionalBundles,
  expandedRooms,
  bundleOptionSelections,
  isRemixExpanded,
  isPreviewExpanded,
  payload,
  toggleBundleOption,
  selectOptionalBundle,
  toggleRoomExpanded,
  setIsRemixExpanded,
  setIsPreviewExpanded,
}: RemixConfigurationProps) {
  return (
    <div className="space-y-4 rounded-xl border bg-card p-4 shadow-sm">
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-md px-1 py-1 text-left hover:bg-muted"
        onClick={() => setIsRemixExpanded((prev) => !prev)}
        aria-expanded={isRemixExpanded}
      >
        <h2 className="text-lg font-semibold">Remix Configuration</h2>
        <span className="text-xs text-muted-foreground">
          {isRemixExpanded ? "Collapse" : "Expand"}
        </span>
      </button>

      {!isRemixExpanded ? null : (
        <div className="space-y-2">
          {roomConfigs.map((room) => {
            const selectedInGroups = selectedOptionalBundles[room.room] ?? {};
            const isExpanded = expandedRooms[room.room] ?? false;

            const defaultBundlesWithOptions = room.defaultBundles.filter(
              (bundle) => Boolean(bundle.optionGroups?.length),
            );

            return (
              <section
                key={room.room}
                className="space-y-4 rounded-lg border p-3"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-md px-1 py-1 text-left hover:bg-muted"
                  onClick={() => toggleRoomExpanded(room.room)}
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-3">
                    <SpriteBox
                      label={room.room}
                      size={48}
                      spriteSheetIndex={{
                        image: JunimoNote,
                        index: room.roomSpriteIndex,
                        colsInSprite: 20,
                        sourceCellSize: 32,
                        heightOffset: 180,
                      }}
                    />
                    <h3 className="text-base font-semibold">{room.room}</h3>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {isExpanded ? "Collapse" : "Expand"}
                  </span>
                </button>

                {!isExpanded ? null : (
                  <>
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Optional Bundle Groups
                      </h4>
                      {room.optionalBundleGroups.map((group) => (
                        <div
                          key={`${room.room}-${group.id}`}
                          className="space-y-2"
                        >
                          <p className="text-xs text-muted-foreground">
                            {group.pick > 1
                              ? `Pick up to ${group.pick} (or none to allow any)`
                              : `Pick ${group.pick} (or none to allow any)`}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {group.bundles.map((bundle) => {
                              const selectedBundleIds =
                                selectedInGroups[group.id] ?? [];
                              const isSelected = selectedBundleIds.includes(
                                bundle.id,
                              );

                              return (
                                <BundleToggle
                                  key={`${room.room}-${bundle.id}`}
                                  room={room.room}
                                  bundleId={bundle.id}
                                  pressed={isSelected}
                                  onPressedChange={(nextPressed) => {
                                    selectOptionalBundle(
                                      room.room,
                                      group.id,
                                      bundle.id,
                                      group.pick,
                                      nextPressed,
                                    );
                                  }}
                                  size={48}
                                />
                              );
                            })}
                          </div>

                          {(selectedInGroups[group.id] ?? []).map(
                            (bundleId) => {
                              const selectedBundle = group.bundles.find(
                                (bundle) => bundle.id === bundleId,
                              );
                              if (!selectedBundle) {
                                return null;
                              }

                              if (!selectedBundle.optionGroups?.length) {
                                return null;
                              }

                              return (
                                <div
                                  key={`${room.room}-${group.id}-${selectedBundle.id}-options`}
                                  className="space-y-2 rounded-md border border-dashed p-2"
                                >
                                  <BundleOptionGroups
                                    room={room}
                                    bundle={selectedBundle}
                                    contextKey={`${room.room}-${group.id}`}
                                    bundleSelections={
                                      bundleOptionSelections[room.room]?.[
                                        selectedBundle.id
                                      ] ?? {}
                                    }
                                    onToggleOption={toggleBundleOption}
                                  />
                                </div>
                              );
                            },
                          )}
                        </div>
                      ))}
                    </div>

                    {defaultBundlesWithOptions.length > 0 ? (
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Default Bundle Item Filters
                        </h4>

                        {defaultBundlesWithOptions.map((bundle) => {
                          return (
                            <div
                              key={`${room.room}-${bundle.id}-default-options`}
                              className="space-y-2"
                            >
                              <BundleOptionGroups
                                room={room}
                                bundle={bundle}
                                contextKey={`${room.room}-default`}
                                bundleSelections={
                                  bundleOptionSelections[room.room]?.[
                                    bundle.id
                                  ] ?? {}
                                }
                                onToggleOption={toggleBundleOption}
                              />
                            </div>
                          );
                        })}
                      </div>
                    ) : null}
                  </>
                )}
              </section>
            );
          })}

          <section className="space-y-2 rounded-lg border p-3">
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-md px-1 py-1 text-left hover:bg-muted"
              onClick={() => setIsPreviewExpanded((prev) => !prev)}
              aria-expanded={isPreviewExpanded}
            >
              <h3 className="text-sm font-semibold">Payload Preview</h3>
              <span className="text-xs text-muted-foreground">
                {isPreviewExpanded ? "Collapse" : "Expand"}
              </span>
            </button>

            {!isPreviewExpanded ? null : (
              <>
                <p className="text-xs text-muted-foreground">
                  Payload that will be run
                </p>
                <pre className="max-h-80 overflow-auto rounded-md bg-muted p-3 text-xs">
                  {JSON.stringify(payload, null, 2)}
                </pre>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
