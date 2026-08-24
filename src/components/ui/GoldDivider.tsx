interface GoldDividerProps {
  className?: string;
  width?: string;
}

export function GoldDivider({ className = "", width = "w-24" }: GoldDividerProps) {
  return <div className={`gold-rule ${width} ${className}`} aria-hidden="true" />;
}
