import express from "express";
import * as userControllers from "./user.controller";
import { upload } from "@/config/upload";

const router = express.Router();

//api/users/register
router.post("/register", upload.single("avatar"), userControllers.CreateUser);

//api/users/login
router.post("/login", userControllers.LoginUser);

//api/users
router.get("/", userControllers.ListUsers);

//refresh
router.post("/refresh", userControllers.RefreshToken);


export default router;
