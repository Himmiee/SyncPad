import { NextFunction, Request, Response } from "express";
import * as userService from "./user.service";
import { logger } from "@/utils/logger";
import { createUserSchema, loginUserSchema } from "./user.validator";

// Create User
export const CreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = createUserSchema.parse(req.body);
    const { user, token } = await userService.createUser(data);

    logger.info("Created user:", user.email);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
      token,
    });
  } catch (err) {
    next(err);
  }
};

// Login User
export const LoginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = loginUserSchema.parse(req.body);
    const { user, token } = await userService.loginUser(data);

    logger.info("Logged in user:", user.email);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: user,
      token,
    });
  } catch (err) {
    next(err);
  }
};

// Find User by ID
export const FindUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await userService.findUserById(Number(id));
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// Get all users
export const ListUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.listUsers();
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
