import express, { Router } from "express";
import cors from "cors";
import helmet from "helmet";
import AWSXRay from "aws-xray-sdk";

import usersRoutes from "./router.js";
import errorHandler from "../common/errorHandler.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json({ extended: false }));
app.use(AWSXRay.express.openSegment("Users service v2"));

app.use("/users", usersRoutes(Router()));
app.use(errorHandler);

app.use(AWSXRay.express.closeSegment());

export default app;
