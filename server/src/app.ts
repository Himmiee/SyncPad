import express from "express";
import userRouter from "./modules/user/user.route";
import { ErrorHandler } from "./middleware/errorHandler";
import cookieParser from "cookie-parser";
// import cors from "cors"; 

export const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:3000", 
//     credentials: true, 
//   })
// );

app.use(cookieParser());
app.use(express.json());

app.use("/v1/users", userRouter);
app.use(ErrorHandler);
