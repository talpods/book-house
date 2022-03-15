import express, { Router } from "express";
import cors from "cors";

// Routes
import categoriesRoutes from "./router.js";

const app = express();

// Middleware
// Parse body to the request
app.use(express.json({ extended: false }));

// Test API
app.get("/", (req, res) => {
  res.send("api is running");
});

// Initializing routes
app.use(
  "/api/categories",
  cors({ origin: "*", optionsSuccessStatus: 200 }),
  categoriesRoutes(Router())
);

export default app;
