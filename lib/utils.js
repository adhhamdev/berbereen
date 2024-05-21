export function arrayBufferToImgSrc(buffer) {
  const base64 = Buffer.from(buffer).toString("base64");
  return `data:image/png;base64,${base64}`;
}
