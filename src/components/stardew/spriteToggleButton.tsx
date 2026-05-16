import { useState } from "react";
import Sprite from "./sprite";

type SpriteToggleButtonProps = {
  label: string;
  spriteSheetIndex: SpriteSheetIndex;
  id?: string;
  pressed?: boolean;
  disabledState?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  onDisabledStateChange?: (disabledState: boolean) => void;
  size?: number;
  className?: string;
};

export default function SpriteToggleButton({
  label,
  spriteSheetIndex,
  id,
  pressed,
  disabledState = false,
  defaultPressed = false,
  onPressedChange,
  onDisabledStateChange,
  size = 64,
  className = "",
}: SpriteToggleButtonProps) {
  const [internalPressed, setInternalPressed] = useState(defaultPressed);
  const isControlled = pressed !== undefined;
  const isPressed = isControlled ? pressed : internalPressed;

  const handleToggle = () => {
    if (disabledState) {
      return;
    }

    const nextPressed = !isPressed;
    if (!isControlled) {
      setInternalPressed(nextPressed);
    }
    onPressedChange?.(nextPressed);
  };

  const handleContextMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onDisabledStateChange?.(!disabledState);
  };

  const buttonClasses = [
    "inline-flex select-none items-center justify-center rounded-md border-2 border-[#7f6a44] p-2",
    "cursor-pointer transition-[transform,box-shadow] duration-[120ms] ease-out",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4b89dc]",
    disabledState
      ? "translate-y-0 border-[#913838] bg-[#a53f3f] opacity-70"
      : isPressed
        ? "translate-y-px bg-[#03A007]"
        : "translate-y-0 bg-[#DDA059]",
    className,
  ].join(" ");

  return (
    <button
      id={id}
      type="button"
      className={buttonClasses}
      onClick={handleToggle}
      onContextMenu={handleContextMenu}
      aria-pressed={isPressed}
      title={label}
    >
      <Sprite spriteSheetIndex={spriteSheetIndex} size={size} />
    </button>
  );
}
