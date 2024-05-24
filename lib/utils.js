export const bufferToImage = (buffer) => {
  if (!buffer || buffer.byteLength === 0) {
    throw new Error("Invalid input buffer");
  }
  const base64 = Buffer.from(buffer).toString("base64");
  return `data:image/png;base64,${base64}`;
};