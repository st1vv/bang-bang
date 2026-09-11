const PIXEL_COLORS = ["bg-cyan", "bg-pink", "bg-gold", "bg-emerald"];

export const Spinner = () => {
  return (
    <div role="status" aria-label="Loading" className="flex items-end gap-1.5">
      {PIXEL_COLORS.map((color, index) => (
        <span
          key={color}
          className={`pixel-bounce size-3.5 ${color}`}
          style={{ "--delay": `${index * 0.12}s` } as React.CSSProperties}
        />
      ))}
    </div>
  );
};
