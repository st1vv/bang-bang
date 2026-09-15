// Text version of bang-logo.svg: white top line, gold bottom line, black
// outline and a hard offset shadow, tilted the same way as the original.
export const Logo = () => {
  return (
    <span className="logo block -rotate-3 select-none font-display text-2xl leading-[0.82] lg:text-3xl">
      <span className="block">BANG</span>
      <span className="logo-accent block">BANG</span>
    </span>
  );
};
