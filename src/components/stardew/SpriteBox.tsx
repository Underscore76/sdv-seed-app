import Sprite from "./sprite";

type SpriteBoxProps = {
  label: string;
  spriteSheetIndex: SpriteSheetIndex;
  id?: string;
  size?: number;
  className?: string;
};

export default function SpriteBox({
  label,
  spriteSheetIndex,
  id,
  size = 64,
  className = "",
}: SpriteBoxProps) {
  const buttonClasses = [
    "inline-flex select-none items-center justify-center rounded-md border-2 border-[#7f6a44] p-1",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4b89dc]",
    className,
  ].join(" ");

  return (
    <div id={id} className={buttonClasses} title={label}>
      <Sprite spriteSheetIndex={spriteSheetIndex} size={size} />
    </div>
  );
}
