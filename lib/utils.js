export function arrayBufferToImgSrc(buffer, format) {
  const base64 = Buffer.from(buffer).toString("base64");
  return `data:image/${format};base64,${base64}`;
}
