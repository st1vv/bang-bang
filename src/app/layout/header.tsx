import { NavLink, useLocation } from "react-router";
import { Logo } from "@/shared/logo";

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `font-display text-base transition-colors ${
    isActive ? "text-gold" : "text-white/90 hover:text-cyan"
  }`;

// Full labels plus the logo do not fit on a phone: they wrap mid-name and
// crowd the logo, so narrow screens get the short form instead.
type NavLabelProps = {
  short: string;
  full: string;
};

const NavLabel = ({ short, full }: NavLabelProps) => (
  <>
    <span className="sm:hidden">{short}</span>
    <span className="hidden sm:inline">{full}</span>
  </>
);

export const Header = () => {
  // Carrying the query string keeps the entered wallet when switching pages.
  const { search } = useLocation();

  return (
    <header className="flex items-center justify-between border-b border-white/15 px-4 py-2 lg:px-8">
      <NavLink to={{ pathname: "/", search }}>
        <Logo />
      </NavLink>
      <nav className="flex items-center gap-3 lg:gap-4">
        <NavLink to={{ pathname: "/", search }} end className={navLinkClasses}>
          <NavLabel short="Bots" full="Banger Bots" />
        </NavLink>
        <NavLink to={{ pathname: "/lil", search }} className={navLinkClasses}>
          <NavLabel short="Lil'" full="Lil' Bangers" />
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
