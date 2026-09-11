import { Link } from "react-router";

export const Header = () => {
  return (
    <header className="flex items-center justify-between border-b border-white/15 px-4 py-2 lg:px-8">
      <Link to="/">
        <img
          src="/bang-logo.svg"
          alt="Bang Bang"
          className="h-10 w-auto lg:h-16"
        />
      </Link>
      <nav>
        <Link
          to="/"
          className="font-display text-base text-white/90 hover:text-cyan transition-colors"
        >
          Banger Bots
        </Link>
      </nav>
    </header>
  );
};
