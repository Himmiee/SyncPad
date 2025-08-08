import { NextFunction, Request, Response } from "express";
import * as userService from "./user.service";
import { logger } from "@/utils/logger";
import { createUserSchema, loginUserSchema } from "./user.validator";
import { signAccessToken, verifyRefreshToken } from "@/config/jwt";

// Create User
export const CreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = createUserSchema.parse(req.body);
    const file = req.file;

    const { user, token } = await userService.createUser(data, file);

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
    const { user, token, refreshToken } = await userService.loginUser(data);

    logger.info("Logged in user:", user.email);

    // Set the refresh token in a secure cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: user,
      token: token,
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

// refresh token
export const RefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(401).json({ message: "No token" });

    try {
      const payload = verifyRefreshToken(refreshToken);
      const user = await userService.findUserById(payload.userId);

      if (!user || user.refreshToken !== refreshToken) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      const newAccessToken = signAccessToken(user.id);
      res.json({ accessToken: newAccessToken });
    } catch (err) {
      res.status(403).json({ message: "Token expired or invalid" });
    }
  } catch (err) {
    next(err);
  }
};
