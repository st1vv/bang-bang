export const Footer = () => {
  return (
    <footer className="bg-ink px-4 py-6 text-center lg:px-8">
      <p className="text-xs lg:text-sm font-mono text-white/60 leading-relaxed">
        Community project by{" "}
        <a
          href="https://x.com/stivcrypto"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white font-semibold hover:text-cyan transition-colors"
        >
          {"[cryptostiv]"}
        </a>
      </p>
    </footer>
  );
};
