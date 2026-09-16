import type { CollectionNft } from "@/api/definitions";

const CELL_SIZE = 512;
const MAX_CANVAS_SIZE = 2048;
const BACKGROUND = "#170f26";

// Big grids would otherwise blow past 3000px a side, which is heavy to hand to
// the clipboard, so cells shrink once the full size would exceed the cap.
const cellSizeFor = (columns: number) =>
  Math.min(CELL_SIZE, Math.floor(MAX_CANVAS_SIZE / columns));

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    // The seadn CDN sends Access-Control-Allow-Origin, so requesting the image
    // as CORS keeps the canvas untainted and exportable.
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Failed to load ${src}`));
    image.src = src;
  });

export const renderCollage = async (
  nfts: CollectionNft[],
  columns: number,
): Promise<Blob> => {
  const cellSize = cellSizeFor(columns);
  const canvas = document.createElement("canvas");
  canvas.width = columns * cellSize;
  canvas.height = columns * cellSize;

  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is not supported");

  context.fillStyle = BACKGROUND;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const images = await Promise.all(nfts.map((nft) => loadImage(nft.image)));

  images.forEach((image, index) => {
    context.drawImage(
      image,
      (index % columns) * cellSize,
      Math.floor(index / columns) * cellSize,
      cellSize,
      cellSize,
    );
  });

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Export failed"))),
      "image/png",
    );
  });
};
