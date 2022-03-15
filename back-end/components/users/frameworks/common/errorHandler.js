import Status from "./statusCode.js";

export default (err, req, res, next) => {
  const { message } = err;
  const statusCode = err.statusCode || Status.INTERNAL_SERVER_ERROR;
  
  console.log(err);

  res.status(statusCode).json({ error: message });
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
