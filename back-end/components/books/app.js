import express, { Router } from "express";
import cors from "cors";
// Routes
import booksRoutes from "./frameworks/web/router.js";

const app = express();

// Middleware
// Parse body to the request
app.use(express.json({ extended: false }));
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
    allowedHeaders: ["Content-Type", "Authorization", "limit", "last"],
    preflightContinue: true,
  })
);
app.use(function (req, res, next) {
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,limit,last"
  );
  next();
});
// Test API
app.get("/", (req, res) => {
  res.send("api is running");
});

// Initializing routes
app.use("/api/books", booksRoutes(Router()));

export default app;
