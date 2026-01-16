import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

import taskRouter from "./src/routers/taskRouter.js";
import authRouter from "./src/routers/authRouter.js";
import accountRouter from "./src/routers/accountRouter.js";
import whoAmI from "./src/routers/whoami.js";

const app = express();

app.use(
  cors({
    origin: "https://react-redux-taskmanager.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);

app.use("/tasks", taskRouter);

app.use("/account", accountRouter);
app.use("/whoami", whoAmI);
export default app;
