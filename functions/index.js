import { createDatabaseClient } from "./actions";

const userEventHandler = async ({ req, res, log, error }) => {
  const data = await req.json();
  log(data)
  // const { database } = await createDatabaseClient();
  // database.createDocument();
  return res.empty();
};

export default userEventHandler;
