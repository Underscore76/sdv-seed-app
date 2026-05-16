type SpriteSheetIndex = {
  image: string;
  index: number;
  colsInSprite: number;
  sourceCellSize: number;
  heightOffset: number;
};

type BundleItemOption = {
  id: string;
  label: string;
  objectId?: string;
  flag?: string;
};

type BundleOptionGroup = {
  id: string;
  label: string;
  options: BundleItemOption[];
  pick: number;
};

type BundleDefinition = {
  id: string;
  name: string;
  flag?: string;
  // Canonical options shape. For simple bundles, provide a single optionGroup.
  optionGroups?: BundleOptionGroup[];
};

type OptionalBundleGroup = {
  id: string;
  bundles: BundleDefinition[];
  pick: number;
};

type RoomDefinition = {
  room: string;
  roomSpriteIndex: number;
  optionalBundleGroups: OptionalBundleGroup[];
  defaultBundles: BundleDefinition[];
};

type RemixRoomPayload = {
  room: string;
  includedBundles: string[];
  bundleOptionSelections: Record<string, string[]>;
};

type RemixSearchPayload = {
  rooms: RemixRoomPayload[];
  enabledFlags: string[];
  disabledFlags: string[];
};

type OptionalBundleSelectionsByRoom = Record<string, Record<string, string[]>>;

type OptionalBundleDisabledByRoom = Record<string, Record<string, string[]>>;

type BundleOptionGroupSelections = Record<string, string[]>;

type BundleOptionSelectionsByRoom = Record<
  string,
  Record<string, BundleOptionGroupSelections>
>;

type BundleOptionDisabledByRoom = Record<
  string,
  Record<string, BundleOptionGroupSelections>
>;
