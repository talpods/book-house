import aws from "serverless-http";
import app from "./app.js";

const server = aws(app);

export const execute = async function (event, context) {
  return await server(event, context);
};
