import express, { Router } from "express";
import cors from "cors";
import ordersRoutes from "./orders.routes.js";

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

app.use(express.json({ extended: false }));
app.use("/api/orders", ordersRoutes(Router()));

export default app;
