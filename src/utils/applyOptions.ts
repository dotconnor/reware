import sharp from "sharp";
// eslint-disable-next-line no-unused-vars
import { QueryOptions } from "./parseOptions";

export async function applyOptions(
  image: Buffer,
  opts: QueryOptions
): Promise<Buffer> {
  let img = sharp(image);
  if (opts.width || opts.height) {
    img = img.resize(opts.width, opts.height, {
      fit: opts.fit,
    });
  }

  if (opts.type) {
    switch (opts.type) {
      case `webp`:
        img = img.webp({
          quality: opts.quality,
        });
        break;
      case `png`:
        img = img.png();
        break;
      case `jpg`:
        img = img.jpeg({
          quality: opts.quality,
        });
        break;
      default:
    }
  }

  return img.toBuffer();
}
