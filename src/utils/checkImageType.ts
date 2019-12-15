import fileType from "file-type";

const imageExts = new Set([`jpg`, `png`, `gif`, `webp`]);

export const checkImageType = (input: Buffer) => {
  const ret = fileType(input);
  return ret ? (imageExts.has(ret && ret.ext) ? ret : null) : null;
};
