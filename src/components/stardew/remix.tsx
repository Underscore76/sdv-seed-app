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
  disabledOptionalBundles,
  disabledBundleOptionSelections,
  toggleBundleOption,
  toggleBundleOptionDisabled,
  selectOptionalBundle,
  toggleOptionalBundleDisabled,
  toggleRoomExpanded,
  resetRoomSelections,
}: RemixConfigurationProps) {
  return (
    <div className="space-y-2">
      {roomConfigs.map((room) => {
        const selectedInGroups = selectedOptionalBundles[room.room] ?? {};
        const disabledInGroups = disabledOptionalBundles[room.room] ?? {};
        const isExpanded = expandedRooms[room.room] ?? false;
        const roomBundleSelections = bundleOptionSelections[room.room] ?? {};
        const roomDisabledBundleSelections =
          disabledBundleOptionSelections[room.room] ?? {};

        const selectedBundleCount = Object.values(selectedInGroups).reduce(
          (sum, group) => sum + group.length,
          0,
        );
        const disabledBundleCount = Object.values(disabledInGroups).reduce(
          (sum, group) => sum + group.length,
          0,
        );
        const selectedItemCount = Object.values(roomBundleSelections).reduce(
          (bundleSum, groups) =>
            bundleSum +
            Object.values(groups).reduce(
              (groupSum, items) => groupSum + items.length,
              0,
            ),
          0,
        );
        const disabledItemCount = Object.values(
          roomDisabledBundleSelections,
        ).reduce(
          (bundleSum, groups) =>
            bundleSum +
            Object.values(groups).reduce(
              (groupSum, items) => groupSum + items.length,
              0,
            ),
          0,
        );

        const defaultBundlesWithOptions = room.defaultBundles.filter((bundle) =>
          Boolean(bundle.optionGroups?.length),
        );

        return (
          <section key={room.room} className="space-y-4 rounded-lg border p-3">
            <div className="flex w-full items-center justify-between rounded-md px-1 py-1">
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
                <div className="space-y-0.5">
                  <h3 className="text-lg font-semibold">{room.room}</h3>
                  {!isExpanded ? (
                    <p className="text-xs text-muted-foreground">
                      Bundles: {selectedBundleCount} selected,{" "}
                      {disabledBundleCount} disabled | Items:{" "}
                      {selectedItemCount} selected, {disabledItemCount} disabled
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-md border bg-card px-3 py-1.5 text-sm text-muted-foreground shadow-sm transition-colors hover:bg-muted"
                  onClick={() => resetRoomSelections(room.room)}
                >
                  Reset
                </button>
                <button
                  type="button"
                  className="rounded-md border bg-card px-3 py-1.5 text-sm text-muted-foreground shadow-sm transition-colors hover:bg-muted"
                  onClick={() => toggleRoomExpanded(room.room)}
                  aria-expanded={isExpanded}
                >
                  {isExpanded ? "Collapse" : "Expand"}
                </button>
              </div>
            </div>

            {!isExpanded ? null : (
              <>
                <div className="space-y-3">
                  <h4 className="text-base font-medium text-muted-foreground">
                    Optional Bundle Groups
                  </h4>
                  {room.optionalBundleGroups.map((group) => (
                    <div key={`${room.room}-${group.id}`} className="space-y-0">
                      <p className="text-sm text-muted-foreground">
                        {`Selected:`}{" "}
                        {(selectedInGroups[group.id] ?? []).length} /{" "}
                        {group.pick}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {group.bundles.map((bundle) => {
                          const selectedBundleIds =
                            selectedInGroups[group.id] ?? [];
                          const disabledBundleIds =
                            disabledOptionalBundles[room.room]?.[group.id] ??
                            [];
                          const isSelected = selectedBundleIds.includes(
                            bundle.id,
                          );
                          const isDisabled = disabledBundleIds.includes(
                            bundle.id,
                          );

                          return (
                            <BundleToggle
                              key={`${room.room}-${bundle.id}`}
                              room={room.room}
                              bundleId={bundle.id}
                              pressed={isSelected}
                              disabledState={isDisabled}
                              onPressedChange={(nextPressed) => {
                                selectOptionalBundle(
                                  room.room,
                                  group.id,
                                  bundle.id,
                                  group.pick,
                                  nextPressed,
                                );
                              }}
                              onDisabledStateChange={() => {
                                toggleOptionalBundleDisabled(
                                  room.room,
                                  group.id,
                                  bundle.id,
                                  group.pick,
                                  group.bundles.length,
                                );
                              }}
                              size={64}
                            />
                          );
                        })}
                      </div>

                      {(selectedInGroups[group.id] ?? []).map((bundleId) => {
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
                              disabledBundleSelections={
                                disabledBundleOptionSelections[room.room]?.[
                                  selectedBundle.id
                                ] ?? {}
                              }
                              onToggleOption={toggleBundleOption}
                              onToggleOptionDisabled={
                                toggleBundleOptionDisabled
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {defaultBundlesWithOptions.length > 0 ? (
                  <div className="space-y-3">
                    <h4 className="text-base font-medium text-muted-foreground">
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
                              bundleOptionSelections[room.room]?.[bundle.id] ??
                              {}
                            }
                            disabledBundleSelections={
                              disabledBundleOptionSelections[room.room]?.[
                                bundle.id
                              ] ?? {}
                            }
                            onToggleOption={toggleBundleOption}
                            onToggleOptionDisabled={toggleBundleOptionDisabled}
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
    </div>
  );
}
