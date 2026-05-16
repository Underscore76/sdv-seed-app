import SpringObjects from "@/assets/stardew/springobjects.png";
import SpringObjects2 from "@/assets/stardew/Objects_2.png";
import Objects from "@/assets/stardew/Objects.json";
import SpriteToggleButton from "./spriteToggleButton";

type ObjectData = (typeof Objects)[keyof typeof Objects];

type ObjectToggleButtonProps = {
  objectId: string;
  id?: string;
  pressed?: boolean;
  disabledState?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  onDisabledStateChange?: (disabledState: boolean) => void;
  size?: number;
  className?: string;
};

const objectsById: { [key: string]: ObjectData } = Objects;

const getSheetImage = (sheet: string | null): string => {
  if (sheet === null) {
    return SpringObjects; // default image
  }
  return SpringObjects2;
};

const getObjectSpriteIndex = (objectData: ObjectData): SpriteSheetIndex => {
  const image = getSheetImage(objectData.Texture);
  const colsInSprite = image === SpringObjects ? 24 : 8;

  return {
    image,
    index: objectData.SpriteIndex,
    colsInSprite,
    sourceCellSize: 64,
    heightOffset: 0,
  };
};

export default function ObjectToggleButton({
  objectId,
  id,
  pressed,
  disabledState = false,
  defaultPressed = false,
  onPressedChange,
  onDisabledStateChange,
  size = 64,
  className = "",
}: ObjectToggleButtonProps) {
  const objectData = objectsById[objectId];
  if (!objectData) {
    return null;
  }

  const spriteSheetIndex = getObjectSpriteIndex(objectData);

  return (
    <SpriteToggleButton
      label={objectData.Name}
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
