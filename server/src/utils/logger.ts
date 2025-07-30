//  check the current environment to avoid logging in production environmenr
const isDev = process.env.NODE_ENV !== "production";

export const logger = {
  info: (...args: any[]) => isDev && console.info("[INFO]", ...args),
  warn: (...args: any[]) => isDev && console.warn("[WARN]", ...args),
  error: (...args: any[]) => isDev && console.error("[ERROR", ...args),
  log: (...args: any[]) => isDev && console.log("[LOG]", ...args),
};
