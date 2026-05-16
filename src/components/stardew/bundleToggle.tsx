import RandomBundles1_6 from "@/assets/stardew/RandomBundles1_6.json";
import JunimoNote from "@/assets/stardew/JunimoNote.png";
import BundleSprites from "@/assets/stardew/BundleSprites.png";
import SpriteToggleButton from "./spriteToggleButton";

type BundleData = {
  Id: string;
  Name: string;
  Index: number;
  Sprite: string;
  Color: string;
  Items: string;
  Pick: number;
  RequiredItems: number;
  Reward: string;
};

type BundleToggleProps = {
  room: string;
  bundleId: string;
  id?: string;
  pressed?: boolean;
  disabledState?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  onDisabledStateChange?: (disabledState: boolean) => void;
  size?: number;
  className?: string;
};

const getBundleData = (room: string, bundleId: string): BundleData => {
  for (let i = 0; i < RandomBundles1_6.length; i++) {
    if (RandomBundles1_6[i].Id == room) {
      if (RandomBundles1_6[i].BundleSets.length > 0) {
        for (
          let j = 0;
          j < RandomBundles1_6[i].BundleSets[0].Bundles.length;
          j++
        ) {
          if (RandomBundles1_6[i].BundleSets[0].Bundles[j].Id == bundleId) {
            return RandomBundles1_6[i].BundleSets[0].Bundles[j];
          }
        }
      }
      for (let j = 0; j < RandomBundles1_6[i].Bundles.length; j++) {
        if (RandomBundles1_6[i].Bundles[j].Id == bundleId) {
          return RandomBundles1_6[i].Bundles[j];
        }
      }
    }
  }
  throw new Error(`Bundle with id ${bundleId} not found in room ${room}`);
};

const getSheetImage = (data: BundleData): SpriteSheetIndex => {
  if (data.Sprite.includes("LooseSprites")) {
    return {
      image: BundleSprites,
      index: parseInt(data.Sprite.split(":")[1], 10),
      colsInSprite: 8,
      heightOffset: 0,
      sourceCellSize: 32,
    };
  }
  return {
    image: JunimoNote,
    index: parseInt(data.Sprite, 10),
    sourceCellSize: 32,
    colsInSprite: 20,
    heightOffset: 180,
  };
};

export default function BundleToggle({
  room,
  bundleId,
  id,
  pressed,
  disabledState = false,
  defaultPressed = false,
  onPressedChange,
  onDisabledStateChange,
  size = 64,
  className = "",
}: BundleToggleProps) {
  const bundleData = getBundleData(room, bundleId);
  const spriteSheetIndex = getSheetImage(bundleData);

  return (
    <SpriteToggleButton
      label={bundleData.Name}
      spriteSheetIndex={spriteSheetIndex}
      id={id}
      pressed={pressed}
      disabledState={disabledState}
      defaultPressed={defaultPressed}
      onPressedChange={onPressedChange}
      onDisabledStateChange={onDisabledStateChange}
      size={size}
      className={className}
    />
  );
}
