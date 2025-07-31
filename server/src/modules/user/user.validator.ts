import { emailRegex, passwordRegex } from "@/utils/regex";
import { z } from "zod";

export const createUserSchema = z
  .object({
    username: z.string().min(2),
    email: z
      .string()
      .min(1, "Email is required")
      .regex(emailRegex, "Invalid email format"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(passwordRegex, "Password must include a letter and a number"),
    avatar: z.string().optional(),
  })
  .strict();

export const loginUserSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .regex(emailRegex, "Invalid email format"),
    password: z.string().min(6, "Password is required"),
  })
  .strict();

export type LoginInput = z.infer<typeof loginUserSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
