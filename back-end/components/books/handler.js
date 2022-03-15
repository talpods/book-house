import serverless from "serverless-http";
import app from "./app.js";

const server = serverless(app);

export const fun = async (event, context) => {
  return await server(event, context);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
