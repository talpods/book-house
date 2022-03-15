import Status from "../utility/statusCode.js";

// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
  const { message } = err;
  const status = err.statusCode || Status.INTERNAL_SERVER_ERROR;
  if (process.env.NODE_ENV === "development") console.error(err);
  res.locals.errorMessage = message;
  res.status(status).json({ error: message });
};

const exitHandler = () => {
  console.info("Server closed");
  process.exit(1);
};

const unexpectedErrorHandler = (error) => {
  console.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.info("SIGTERM received");
  process.exit(1);
});
