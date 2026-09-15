type AddressInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export const AddressInput = ({
  value,
  onChange,
  onSubmit,
}: AddressInputProps) => {
  return (
    // A form so Enter submits natively, alongside the button.
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      className="flex w-full max-w-md gap-2"
    >
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="0x..."
        className="min-w-0 flex-1 rounded-lg border border-border bg-surface px-4 py-2 font-mono text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="submit"
        className="shrink-0 cursor-pointer rounded-lg bg-gold px-4 py-2 text-sm font-bold text-ink transition-opacity hover:opacity-90"
      >
        Search
      </button>
    </form>
  );
};
