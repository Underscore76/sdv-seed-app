export const getSpriteSheetCSS = (
  sheetImage: SpriteSheetIndex,
  outputSize: number,
): React.CSSProperties => {
  const col = sheetImage.index % sheetImage.colsInSprite;
  const row =
    Math.floor(sheetImage.index / sheetImage.colsInSprite) +
    sheetImage.heightOffset / sheetImage.sourceCellSize;
  const backgroundPositionX = `-${col * outputSize}px`;
  const backgroundPositionY = `-${row * outputSize}px`;
  const backgroundSize = `${sheetImage.colsInSprite * outputSize}px auto`;

  return {
    width: `${outputSize}px`,
    height: `${outputSize}px`,
    backgroundPosition: `${backgroundPositionX} ${backgroundPositionY}`,
    backgroundSize,
    backgroundImage: `url(${sheetImage.image})`,
  };
};

type SpriteProps = {
  spriteSheetIndex: SpriteSheetIndex;
  size?: number;
};

export default function Sprite({ spriteSheetIndex, size = 64 }: SpriteProps) {
  const spriteCSS = getSpriteSheetCSS(spriteSheetIndex, size);
  return (
    <span
      className="inline-block bg-no-repeat [image-rendering:pixelated]"
      style={spriteCSS}
      role="img"
      aria-label={spriteSheetIndex.image}
    />
  );
}
