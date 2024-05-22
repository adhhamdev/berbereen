/**
 * Converts an array buffer to a base64 image source.
 * @param {ArrayBuffer} buffer - The input array buffer.
 * @returns {string} - The base64 image source.
 */
export const bufferToImage = (buffer) => {
  if (!buffer || buffer.byteLength === 0) {
    throw new Error("Invalid input buffer");
  }
  const base64 = Buffer.from(buffer).toString("base64");
  return `data:image/png;base64,${base64}`;
};