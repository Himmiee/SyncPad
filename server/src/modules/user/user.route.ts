import express from "express";
import * as userControllers from "./user.controller";

const router = express.Router();

//api/users/register
router.post("/register", userControllers.CreateUser);

//api/users/login
router.post("/login", userControllers.LoginUser);

//api/users
router.get("/", userControllers.ListUsers);

export default router;
