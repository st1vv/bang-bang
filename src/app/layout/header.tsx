import { Link } from "react-router";

export const Header = () => {
  return (
    <header className="flex items-center justify-between border-b border-white/15 px-4 py-2 lg:px-8">
      <Link to="/">
        <img
          src="/bang-logo.svg"
          alt="Bang Bang"
          className="h-9 w-auto lg:h-14"
        />
      </Link>
      <nav>
        <Link
          to="/"
          className="text-sm font-mono font-semibold text-white/90 hover:text-cyan transition-colors"
        >
          Home
        </Link>
      </nav>
    </header>
  );
};
