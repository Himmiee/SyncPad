import express from "express";
import userRouter from "./modules/user/user.route";
import { ErrorHandler } from "./middleware/errorHandler";

export const app = express();

app.use(express.json());
app.use("/v1/users", userRouter);
app.use(ErrorHandler);
