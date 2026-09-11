// The seadn CDN resizes on demand. Full-resolution art is only needed for the
// exported canvas — on screen a wallet can put a hundred images in the DOM at
// once, and every 500x500 original costs ~1MB of decoded bitmap.
export const thumbnailUrl = (image: string, width: number) =>
  image ? `${image}?w=${width}&auto=format` : image;
