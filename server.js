import express from "express";

import habitRouter from "./src/routers/habitRouter.js";
import authRouter from "./src/routers/authRouter.js";
import accountRouter from "./src/routers/accountRouter.js";

const app = express();

app.use(express.json());

app.use("/auth", authRouter);

app.use("/auth", authRouter);

app.use("/habits", habitRouter);

app.use("/account", accountRouter);
export default app;
