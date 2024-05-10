import { Client } from 'node-appwrite';
const userEventHandler = async ({ req, res, log, error }) => {
  const client = new Client()
     .setEndpoint('https://cloud.appwrite.io/v1')
     .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
     .setKey(process.env.APPWRITE_API_KEY);
     log('Apwrite function working...!');
};

export default userEventHandler;