import ObjectToggleButton from "./objectToggleButton";

type BundleOptionGroupsProps = {
  room: RoomDefinition;
  bundle: BundleDefinition;
  contextKey: string;
  bundleSelections: BundleOptionGroupSelections;
  onToggleOption: (
    room: RoomDefinition,
    bundle: BundleDefinition,
    optionGroupId: string,
    pickLimit: number,
    optionId: string,
  ) => void;
};

export default function BundleOptionGroups({
  room,
  bundle,
  contextKey,
  bundleSelections,
  onToggleOption,
}: BundleOptionGroupsProps) {
  const optionGroups = bundle.optionGroups ?? [];

  if (!optionGroups.length) {
    return null;
  }

  return optionGroups.map((optionGroup) => {
    const selectedOptions = bundleSelections[optionGroup.id] ?? [];
    const hasLimit = Number.isFinite(optionGroup.pick);

    return (
      <div
        key={`${contextKey}-${bundle.id}-${optionGroup.id}`}
        className="space-y-2"
      >
        <p className="text-xs text-muted-foreground">
          {bundle.name}
          {optionGroups.length > 1 ? ` - ${optionGroup.label}` : ""}: selected{" "}
          {selectedOptions.length}
          {hasLimit ? ` / ${optionGroup.pick}` : ""}
        </p>
        <div className="flex flex-wrap gap-2">
          {optionGroup.options.map((option) => {
            const isSelected = selectedOptions.includes(option.id);

            if (option.objectId) {
              return (
                <ObjectToggleButton
                  key={`${bundle.id}-${optionGroup.id}-${option.id}`}
                  objectId={option.objectId}
                  pressed={isSelected}
                  onPressedChange={() =>
                    onToggleOption(
                      room,
                      bundle,
                      optionGroup.id,
                      optionGroup.pick,
                      option.id,
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
                  isSelected
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
