import jwt from "jsonwebtoken";

export const signAccessToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "15m",
  });
};

export const signRefreshToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  });
};

export const verifyRefreshToken = (token: string): { userId: number } => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as {
    userId: number;
  };
};
