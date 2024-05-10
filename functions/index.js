import { createDatabaseClient } from "./actions.js";

const userEventHandler = async ({ req, res, log, error }) => {
  const data = JSON.stringify(req.body)
  const headers = JSON.stringify(req.headers);
  log(data)
  log(headers)
  // const { database } = await createDatabaseClient();
  // database.createDocument();
  return res.empty();
};

export default userEventHandler;
