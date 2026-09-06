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
        "cursor-pointer inline-grid place-items-center rounded-md border bg-card px-3 py-1.5 text-sm text-foreground shadow-sm transition-colors hover:bg-muted font-medium",
        "transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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
