import { cloudinaryUpload } from "@/config/cloudinary";
import prisma from "../../config/db";
import { CreateUserInput, LoginInput } from "./user.validator";
import { compareSync, hashSync } from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (
  data: CreateUserInput,
  file?: Express.Multer.File
) => {
  const hashedPassword = hashSync(data.password, 8);

  const existing = await prisma.user.findFirst({
    where: {
      OR: [{ email: data.email }, { username: data.username }],
    },
  });

  if (existing) {
    throw new Error("Email or username already in use");
  }

  // Upload avatar if file is provided
  if (!file) {
    throw new Error("Avatar image is required");
  }

  const { url: avatarUrl } = await cloudinaryUpload(file.buffer);

  const user = await prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      password: hashedPassword,
      avatar: avatarUrl,
    },
    select: {
      id: true,
      username: true,
      email: true,
      avatar: true,
      createdAt: true,
    },
  });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  return {
    user,
    token,
  };
};


// Find User by ID
export const findUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

// Login User
export const loginUser = async (data: LoginInput) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isValid = compareSync(data.password, user.password);

  if (!isValid) {
    throw new Error("Invalid credentials");
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    },
    token,
  };
};

// Get all users
export const listUsers = async () => {
  return prisma.user.findMany({
    select: { id: true, username: true, email: true, createdAt: true },
  });
};

// Delete User
// export const deleteUser = async (id: string) => {
//   await prisma.user.delete({
//     where: {
//       id,
//     },
//   });
// };
