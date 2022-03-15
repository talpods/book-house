import serverless from "serverless-http";
import app from "./app.js";

const server = serverless(app);

export const execute = async (event, context) => {
  return await server(event, context);
};
