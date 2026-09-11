type AddressInputProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
};

export const AddressInput = ({
  value,
  onChange,
  onBlur,
}: AddressInputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
      placeholder="0x..."
      className="w-full max-w-md rounded-lg border border-border bg-surface px-4 py-2 font-mono text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-primary"
    />
  );
};
