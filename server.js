import express from "express";
import dotenv from "dotenv";

dotenv.config();

import taskRouter from "./src/routers/taskRouter.js";
import authRouter from "./src/routers/authRouter.js";
import accountRouter from "./src/routers/accountRouter.js";

const app = express();

app.use(express.json());

app.use("/auth", authRouter);

app.use("/auth", authRouter);

app.use("/tasks", taskRouter);

app.use("/account", accountRouter);
export default app;
