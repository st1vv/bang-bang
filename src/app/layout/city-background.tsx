const seededRandom = (seed: number) => {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
};

const random = seededRandom(42);

const STAR_COUNT = 60;
const ANIMATED_EVERY = 6;
const STATIC_OPACITY = 0.7;

const STARS = Array.from({ length: STAR_COUNT }, (_, i) => {
  const isSparkle = i % 10 === 0;
  return {
    x: random() * 1440,
    y: random() * 900,
    size: isSparkle ? 6 + random() * 7 : 1 + random() * 1.5,
    isSparkle,
    // Only a tenth of the sky keeps animating — a full field of infinite
    // animations makes every repaint above it (blur, scroll, selection) crawl.
    isAnimated: i % ANIMATED_EVERY === 0,
    duration: 2 + random() * 3,
    delay: random() * 4,
  };
});

const sparklePath = (cx: number, cy: number, r: number) => {
  const inner = r * 0.12;
  return `M ${cx} ${cy - r} L ${cx + inner} ${cy - inner} L ${cx + r} ${cy} L ${cx + inner} ${cy + inner} L ${cx} ${cy + r} L ${cx - inner} ${cy + inner} L ${cx - r} ${cy} L ${cx - inner} ${cy - inner} Z`;
};

export const CityBackground = () => {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="city-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-primary-light)" />
          <stop offset="100%" stopColor="var(--color-primary-dark)" />
        </linearGradient>
      </defs>

      <rect width="1440" height="900" fill="url(#city-sky)" />

      {STARS.map((star, i) => {
        const animation = star.isAnimated
          ? {
              className: "star-shine",
              style: {
                "--duration": `${star.duration}s`,
                "--delay": `${star.delay}s`,
              } as React.CSSProperties,
            }
          : { opacity: STATIC_OPACITY };

        return star.isSparkle ? (
          <path
            key={i}
            {...animation}
            d={sparklePath(star.x, star.y, star.size)}
            fill="white"
          />
        ) : (
          <circle
            key={i}
            {...animation}
            cx={star.x}
            cy={star.y}
            r={star.size}
            fill="white"
          />
        );
      })}
    </svg>
  );
};
