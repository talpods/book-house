import express, { Router } from "express";
import cors from "cors";

// Routes
import usersRoutes from "../components/users/frameworks/web/router.js";
import booksRoutes from "../components/books/frameworks/web/router.js";
import categoriesRoutes from "../components/categories/frameworks/web/router.js";
import ordersRoutes from "../components/orders/orders.routes.js";

const app = express();

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

	// Pass to next layer of middleware
	next();
});

// Middleware
// Parse body to the request
app.use(express.json({ extended: false }));

// Test API
app.get("/", (req, res) => {
	res.send("api is running");
});

// Initializing routes
app.use("/api/users", usersRoutes(Router()));
app.use("/api/books", booksRoutes(Router()));
app.use("/api/categories", categoriesRoutes(Router()));
app.use("/api/orders", ordersRoutes(Router()));

export default app;
