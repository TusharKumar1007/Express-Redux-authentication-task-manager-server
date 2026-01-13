import express from "express";

import habitRouter from "./src/routers/habitRouter.js";
import authRouter from "./src/routers/authRouter.js";

const app = express();

app.use(express.json());

app.use("/auth", authRouter);

app.use("/auth", authRouter);

app.use("/habit", habitRouter);

export default app;
