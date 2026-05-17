import { cn } from "@/lib/utils";

type ToggleButtonProps = {
  onLabel: string;
  offLabel: string;
  pressState: boolean;
  onClick: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function ToggleButton({
  onLabel,
  offLabel,
  pressState,
  onClick,
  className,
  ...props
}: ToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-grid place-items-center rounded-md border bg-card px-3 py-1.5 text-sm text-muted-foreground shadow-sm transition-colors hover:bg-muted",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "col-start-1 row-start-1 whitespace-nowrap",
          pressState ? "visible" : "invisible",
        )}
      >
        {onLabel}
      </span>
      <span
        className={cn(
          "col-start-1 row-start-1 whitespace-nowrap",
          pressState ? "invisible" : "visible",
        )}
      >
        {offLabel}
      </span>
    </button>
  );
}
