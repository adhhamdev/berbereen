'use server';
import {
  createAvatarsClient,
  createDatabasesClient,
  createSessionClient,
  createStorageClient,
  getLoggedInUser,
} from '@/lib/server/appwrite';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ID } from 'node-appwrite';
import { bufferToImage } from '../utils';
import {
  createAdminClient,
  databasesAdmin,
  storageAdmin,
  usersAdmin,
} from './appwrite-admin';

export const signUpWithEmail = async (formData) => {
  const email = formData.get('email');
  const password = formData.get('password');
  const name = formData.get('name');

  try {
    const { account } = createAdminClient();

    const userId = ID.unique();
    await account.create(userId, email, password, name);

    const session = await account.createEmailPasswordSession(email, password);

    setCookie('user-session', session.secret);
  } catch (error) {
    console.error(error);
  }
  redirect('/start?action=signed-up');
};

export const signInWithEmail = async (formData) => {
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const { account } = createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set('user-session', session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });
  } catch (error) {
    console.error(error);
  }
  redirect('/?action=logged-in');
};

export const createProfile = async (formData) => {
  const {
    avatar,
    avatarSelected,
    name,
    username,
    location,
    age,
    phoneNumber,
    gender,
  } = Object.fromEntries(formData);
  const { account } = createSessionClient();
  const { databases } = createDatabasesClient();
  const { storage } = createStorageClient();
  try {
    const user = await getLoggedInUser();
    if (user?.name != name) {
      await account.updateName(name);
    }
    if (avatarSelected) {
      const uploadedAvatar = await storage.createFile(
        'profile',
        ID.unique(),
        avatar
      );
      console.log(uploadedAvatar);
      await updatePrefs({
        avatar: uploadedAvatar.$id,
        username,
        location,
        age,
        phoneNumber,
        gender,
        isProfileComplete: true,
      });
    } else {
      await updatePrefs({
        username,
        location,
        age,
        phoneNumber,
        gender,
        isProfileComplete: true,
      });
    }
    await databases.createDocument('primary', 'user', user.$id, {
      post: [],
      like: [],
    });
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }

  redirect('/?action=profile-completed');
};

export async function deleteCurrentUser() {
  try {
    const user = await getLoggedInUser();
    console.log('Current User Data:', user);
    if (user) {
      const { databases } = createDatabasesClient();
      const { storage } = createStorageClient();
      await storage.deleteFile('profile', user.prefs.avatar);
      await databases.deleteDocument('primary', 'user', user.$id);
      cookies().delete('user-session');
      await usersAdmin.deleteSessions(user.$id);
      await usersAdmin.delete(user.$id);
      console.log('Current User Data deleted!');
    } else {
      console.log('No user logged in!');
    }
  } catch (error) {
    console.error(error);
  }
  redirect('/login?action=account-deleted');
}

export const logOut = async () => {
  try {
    const { account } = createSessionClient();
    await account.deleteSession('current');
  } catch (error) {
    console.error('Error signing out:', error);
    throw new Error(
      'An error occurred while signing out. Please try again later.'
    );
  }
  redirect('/login?action=logged-out');
};

// ABTRACTED FUNCTIONS

export const setCookie = (name, value) => {
  cookies().set(name, value, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  });
};

export const updateCurrentUser = async (attributes) => {
  try {
    const { databases } = createDatabasesClient();
    const updatedUser = await databases.updateDocument(
      'primary',
      'user',
      user.$id,
      attributes
    );
    console.log(`User ${user?.name} updated:`, updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

export const updateUser = async (user, attributes) => {
  try {
    const updatedUser = await databasesAdmin.updateDocument(
      'primary',
      'user',
      user.$id,
      attributes
    );
    console.log(`User ${user?.name} updated:`, updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

export const updatePrefs = async (changes) => {
  try {
    const { account } = createSessionClient();
    const prefs = await account.getPrefs();
    const updatedPrefs = await account.updatePrefs({ ...prefs, ...changes });
    console.log(`User Prefs updated:`, updatedPrefs);
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

export async function deleteUser(user) {
  try {
    if (user) {
      await storageAdmin.deleteFile('profile', user.prefs.avatar);
      await databasesAdmin.deleteDocument('primary', 'user', user.$id);
      cookies().delete('user-session');
      await usersAdmin.deleteSessions(user.$id);
      await usersAdmin.delete(user.$id);
      console.log(`User ${user?.name} Data deleted!`);
    } else {
      console.log('No user logged in!');
    }
  } catch (error) {
    console.error(error);
  }
}

export const setAvatar = async (user) => {
  const { account } = createSessionClient();
  const { avatars } = createAvatarsClient();
  const { storage } = createStorageClient();
  try {
    const avatarBuffer = await avatars.getInitials(user?.name);
    const avatarFile = new File([avatarBuffer], 'avatar', {
      type: 'image/png',
    });
    const createdFile = await storage.createFile(
      'profile',
      ID.unique(),
      avatarFile
    );
    await account.updatePrefs({
      avatar: createdFile.$id,
    });
    console.log(`User ${user?.name} avatar updated!`);
    return createdFile;
  } catch (error) {
    console.error(error);
  }
};

export const getAvatar = async (size) => {
  const user = await getLoggedInUser();
  console.log('user prefs:', user?.prefs);
  if (user) {
    try {
      const { storage } = createStorageClient();
      const avatar = await storage.getFilePreview(
        'profile',
        user?.prefs.avatar,
        size,
        size
      );
      return bufferToImage(avatar);
    } catch (error) {
      console.log('Error getting avatar:', error);
    }
  }
};

export const getImage = async (id) => {
  try {
    const { storage } = createStorageClient();
    const file = await storage.getFilePreview(
      'profile',
      id,
      500,
      500,
      ImageGravity.Center
    );
    return bufferToImage(file);
  } catch (error) {
    console.error('Error getting Post image:', error);
    throw new Error(
      'An error occurred while retrieving the image. Please try again later.'
    );
  }
};
