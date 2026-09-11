import { NavLink, useLocation } from "react-router";
import { Logo } from "@/shared/logo";

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `font-display text-base transition-colors ${
    isActive ? "text-gold" : "text-white/90 hover:text-cyan"
  }`;

export const Header = () => {
  // Carrying the query string keeps the entered wallet when switching pages.
  const { search } = useLocation();

  return (
    <header className="flex items-center justify-between border-b border-white/15 px-4 py-2 lg:px-8">
      <NavLink to={{ pathname: "/", search }}>
        <Logo />
      </NavLink>
      <nav className="flex items-center gap-4">
        <NavLink to={{ pathname: "/", search }} end className={navLinkClasses}>
          Banger Bots
        </NavLink>
        <NavLink
          to={{ pathname: "/collage", search }}
          className={navLinkClasses}
        >
          Collage
        </NavLink>
      </nav>
    </header>
  );
};
