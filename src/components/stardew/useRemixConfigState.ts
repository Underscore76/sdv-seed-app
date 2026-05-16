import { useMemo, useState } from "react";

const getOptionFlagForBundle = (
  bundle: BundleDefinition | undefined,
  optionId: string,
): string | undefined => {
  if (!bundle) {
    return undefined;
  }

  const optionGroups = bundle.optionGroups ?? [];
  for (const group of optionGroups) {
    const option = group.options.find((item) => item.id === optionId);
    if (option?.flag) {
      return option.flag;
    }
  }

  return undefined;
};

const getDefaultOptionalSelection = (
  roomConfigs: RoomDefinition[],
): OptionalBundleSelectionsByRoom => {
  const result: OptionalBundleSelectionsByRoom = {};

  for (const room of roomConfigs) {
    const roomGroups: Record<string, string[]> = {};
    for (const group of room.optionalBundleGroups) {
      roomGroups[group.id] = [];
    }
    result[room.room] = roomGroups;
  }

  return result;
};

const getDefaultExpandedRooms = (
  roomConfigs: RoomDefinition[],
): Record<string, boolean> => {
  const result: Record<string, boolean> = {};

  for (let i = 0; i < roomConfigs.length; i++) {
    result[roomConfigs[i].room] = i === 0;
  }

  return result;
};

const getInitialOptionSelections = (
  roomConfigs: RoomDefinition[],
): BundleOptionSelectionsByRoom => {
  const result: BundleOptionSelectionsByRoom = {};

  for (const room of roomConfigs) {
    const bundleSelections: Record<string, Record<string, string[]>> = {};
    const allBundles = [
      ...room.defaultBundles,
      ...room.optionalBundleGroups.flatMap((group) => group.bundles),
    ];

    for (const bundle of allBundles) {
      const groupSelections: BundleOptionGroupSelections = {};

      for (const optionGroup of bundle.optionGroups ?? []) {
        groupSelections[optionGroup.id] = [];
      }

      bundleSelections[bundle.id] = groupSelections;
    }

    result[room.room] = bundleSelections;
  }

  return result;
};

export const useRemixConfigState = (roomConfigs: RoomDefinition[]) => {
  const [selectedOptionalBundles, setSelectedOptionalBundles] =
    useState<OptionalBundleSelectionsByRoom>(() =>
      getDefaultOptionalSelection(roomConfigs),
    );

  const [expandedRooms, setExpandedRooms] = useState<Record<string, boolean>>(
    () => getDefaultExpandedRooms(roomConfigs),
  );

  const [bundleOptionSelections, setBundleOptionSelections] =
    useState<BundleOptionSelectionsByRoom>(() =>
      getInitialOptionSelections(roomConfigs),
    );

  const [isRemixExpanded, setIsRemixExpanded] = useState(true);
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);

  const bundleByRoomAndId = useMemo(() => {
    const map: Record<string, Record<string, BundleDefinition>> = {};

    for (const room of roomConfigs) {
      const byId: Record<string, BundleDefinition> = {};
      const allBundles = [
        ...room.defaultBundles,
        ...room.optionalBundleGroups.flatMap((group) => group.bundles),
      ];

      for (const bundle of allBundles) {
        byId[bundle.id] = bundle;
      }

      map[room.room] = byId;
    }

    return map;
  }, [roomConfigs]);

  const defaultBundleIdsByRoom = useMemo(() => {
    const map: Record<string, Set<string>> = {};

    for (const room of roomConfigs) {
      map[room.room] = new Set(room.defaultBundles.map((bundle) => bundle.id));
    }

    return map;
  }, [roomConfigs]);

  const toggleBundleOption = (
    room: RoomDefinition,
    bundle: BundleDefinition,
    optionGroupId: string,
    pickLimit: number,
    optionId: string,
  ) => {
    setBundleOptionSelections((prev) => {
      const roomSelections = prev[room.room] ?? {};
      const bundleSelections = roomSelections[bundle.id] ?? {};
      const current = bundleSelections[optionGroupId] ?? [];
      const isSelected = current.includes(optionId);

      if (!isSelected && current.length >= pickLimit) {
        return prev;
      }

      const nextSelection = isSelected
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];

      return {
        ...prev,
        [room.room]: {
          ...roomSelections,
          [bundle.id]: {
            ...bundleSelections,
            [optionGroupId]: nextSelection,
          },
        },
      };
    });
  };

  const selectOptionalBundle = (
    roomName: string,
    groupId: string,
    bundleId: string,
    pickLimit: number,
    nextPressed: boolean,
  ) => {
    setSelectedOptionalBundles((prev) => {
      const roomSelection = prev[roomName] ?? {};
      const current = roomSelection[groupId] ?? [];
      const isSelected = current.includes(bundleId);

      if (isSelected && !nextPressed) {
        return {
          ...prev,
          [roomName]: {
            ...roomSelection,
            [groupId]: current.filter((id) => id !== bundleId),
          },
        };
      }

      if (!isSelected && nextPressed) {
        if (pickLimit === 1) {
          return {
            ...prev,
            [roomName]: {
              ...roomSelection,
              [groupId]: [bundleId],
            },
          };
        }

        if (current.length >= pickLimit) {
          return prev;
        }

        return {
          ...prev,
          [roomName]: {
            ...roomSelection,
            [groupId]: [...current, bundleId],
          },
        };
      }

      return prev;
    });
  };

  const toggleRoomExpanded = (roomName: string) => {
    setExpandedRooms((prev) => ({
      ...prev,
      [roomName]: !prev[roomName],
    }));
  };

  const payload = useMemo<RemixSearchPayload>(() => {
    const rooms: RemixRoomPayload[] = roomConfigs.map((room) => {
      const selectedOptionals = selectedOptionalBundles[room.room] ?? {};
      const selectedOptionalBundleIds = Object.values(selectedOptionals).flat();

      const includedBundles: string[] = [
        ...room.defaultBundles.map((bundle) => bundle.id),
        ...selectedOptionalBundleIds,
      ];

      const optionSelections = bundleOptionSelections[room.room] ?? {};

      const includedBundleOptionSelections: Record<string, string[]> = {};
      for (const bundleId of includedBundles) {
        const groupedSelections = optionSelections[bundleId] ?? {};
        includedBundleOptionSelections[bundleId] =
          Object.values(groupedSelections).flat();
      }

      return {
        room: room.room,
        includedBundles,
        bundleOptionSelections: includedBundleOptionSelections,
      };
    });

    const enabledFlags: string[] = [];

    for (const room of rooms) {
      const bundleMap = bundleByRoomAndId[room.room] ?? {};
      const defaultBundleIds = defaultBundleIdsByRoom[room.room] ?? new Set();

      for (const bundleId of room.includedBundles) {
        const bundleDefinition = bundleMap[bundleId];

        if (!defaultBundleIds.has(bundleId) && bundleDefinition?.flag) {
          enabledFlags.push(bundleDefinition.flag);
        }

        const selectedOptions = room.bundleOptionSelections[bundleId] ?? [];
        for (const optionId of selectedOptions) {
          const optionFlag = getOptionFlagForBundle(bundleDefinition, optionId);

          if (!optionFlag) {
            continue;
          }

          enabledFlags.push(optionFlag);
        }
      }
    }

    return {
      rooms,
      enabledFlags,
      disabledFlags: [], // need to setup
    };
  }, [
    bundleByRoomAndId,
    bundleOptionSelections,
    defaultBundleIdsByRoom,
    roomConfigs,
    selectedOptionalBundles,
  ]);

  return {
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
  };
};

export type RemixConfigState = ReturnType<typeof useRemixConfigState>;
