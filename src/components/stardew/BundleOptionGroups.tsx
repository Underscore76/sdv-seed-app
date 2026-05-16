import ObjectToggleButton from "./objectToggleButton";

type BundleOptionGroupsProps = {
  room: RoomDefinition;
  bundle: BundleDefinition;
  contextKey: string;
  bundleSelections: BundleOptionGroupSelections;
  disabledBundleSelections: BundleOptionGroupSelections;
  onToggleOption: (
    room: RoomDefinition,
    bundle: BundleDefinition,
    optionGroupId: string,
    pickLimit: number,
    optionId: string,
  ) => void;
  onToggleOptionDisabled: (
    room: RoomDefinition,
    bundle: BundleDefinition,
    optionGroupId: string,
    pickLimit: number,
    optionId: string,
    totalOptions: number,
  ) => void;
};

export default function BundleOptionGroups({
  room,
  bundle,
  contextKey,
  bundleSelections,
  disabledBundleSelections,
  onToggleOption,
  onToggleOptionDisabled,
}: BundleOptionGroupsProps) {
  const optionGroups = bundle.optionGroups ?? [];

  if (!optionGroups.length) {
    return null;
  }

  return optionGroups.map((optionGroup) => {
    const selectedOptions = bundleSelections[optionGroup.id] ?? [];
    const disabledOptions = disabledBundleSelections[optionGroup.id] ?? [];
    const hasLimit = Number.isFinite(optionGroup.pick);

    return (
      <div
        key={`${contextKey}-${bundle.id}-${optionGroup.id}`}
        className="space-y-2"
      >
        <p className="text-xs text-muted-foreground">
          {bundle.name}
          {optionGroups.length > 1 ? ` - ${optionGroup.label}` : ""}: Selected{" "}
          {selectedOptions.length}
          {hasLimit ? ` / ${optionGroup.pick}` : ""}
        </p>
        <div className="flex flex-wrap gap-2">
          {optionGroup.options.map((option) => {
            const isSelected = selectedOptions.includes(option.id);
            const isDisabled = disabledOptions.includes(option.id);

            if (option.objectId) {
              return (
                <ObjectToggleButton
                  key={`${bundle.id}-${optionGroup.id}-${option.id}`}
                  objectId={option.objectId}
                  pressed={isSelected}
                  disabledState={isDisabled}
                  onPressedChange={() =>
                    onToggleOption(
                      room,
                      bundle,
                      optionGroup.id,
                      optionGroup.pick,
                      option.id,
                    )
                  }
                  onDisabledStateChange={() =>
                    onToggleOptionDisabled(
                      room,
                      bundle,
                      optionGroup.id,
                      optionGroup.pick,
                      option.id,
                      optionGroup.options.length,
                    )
                  }
                  size={44}
                />
              );
            }

            return (
              <button
                key={`${bundle.id}-${optionGroup.id}-${option.id}`}
                type="button"
                className={`rounded-md border px-2 py-1 text-xs transition-colors ${
                  isDisabled
                    ? "border-[#913838] bg-[#a53f3f] text-white opacity-70"
                    : isSelected
                      ? "border-[#7f6a44] bg-[#03A007] text-white"
                      : "border-border bg-muted"
                }`}
                onClick={() =>
                  onToggleOption(
                    room,
                    bundle,
                    optionGroup.id,
                    optionGroup.pick,
                    option.id,
                  )
                }
                onContextMenu={(event) => {
                  event.preventDefault();
                  onToggleOptionDisabled(
                    room,
                    bundle,
                    optionGroup.id,
                    optionGroup.pick,
                    option.id,
                    optionGroup.options.length,
                  );
                }}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  });
}
