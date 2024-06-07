import { ID } from "node-appwrite";
import {
  createAvatarsClient,
  createSessionClient,
  createStorageClient,
  getLoggedInUser,
} from "./server/appwrite";

export const bufferToImage = (buffer) => {
  if (!buffer || buffer.byteLength === 0) {
    throw new Error("Invalid input buffer");
  }
  const base64 = Buffer.from(buffer).toString("base64");
  return `data:image/png;base64,${base64}`;
};

export const getAvatar = async () => {
  const user = await getLoggedInUser();
  if (user) {
    try {
      const { account } = createSessionClient();
      const { storage } = createStorageClient();
      const prefs = await account.getPrefs();
      const avatar = await storage.getFileView("profile", prefs.avatar);
      return bufferToImage(avatar);
    } catch (error) {
      console.log("Error getting avatar:", error);
    }
  }
};

export const getImage = async (id) => {
  try {
    const { storage } = createStorageClient();
    const file = await storage.getFilePreview(
      "profile",
      id,
      500,
      500,
      ImageGravity.Center
    );
    return bufferToImage(file);
  } catch (error) {
    console.error("Error getting Post image:", error);
    throw new Error(
      "An error occurred while retrieving the image. Please try again later."
    );
  }
};
