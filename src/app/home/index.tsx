export const HomePage = () => {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <div className="max-w-xl space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-white lg:text-4xl">
          View Your Bots
        </h1>
        <p className="text-sm text-white/70 lg:text-base">
          Paste your EVM address below to see your NFTs
        </p>
      </div>
      <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="0x..."
          className="w-full flex-1 rounded-lg border border-border bg-surface px-4 py-2 font-mono text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="rounded-lg bg-gold px-5 py-2 text-sm font-bold text-ink transition-opacity hover:opacity-90"
        >
          View NFTs
        </button>
      </form>
    </section>
  );
};
