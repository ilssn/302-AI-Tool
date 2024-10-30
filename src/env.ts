import { createEnv } from "@t3-oss/env-nextjs";
import { ZodError, z } from "zod";

// Define and validate the environment variables
export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]), // Ensure NODE_ENV is either 'development' or 'production'
  },
  client: {
    // base
    NEXT_PUBLIC_API_URL: z.string(),
    NEXT_PUBLIC_DEFAULT_MODEL_NAME: z.string(),
    // auth
    NEXT_PUBLIC_AUTH_PATH: z.string(),
    NEXT_PUBLIC_AUTH_API_URL: z.string(),
    NEXT_PUBLIC_302_API_KEY: z.string().optional(),
    NEXT_PUBLIC_DEV_HOST_NAME: z.string().optional(),
    // locale
    NEXT_PUBLIC_DEFAULT_REGION: z.string(),
    NEXT_PUBLIC_DEFAULT_LOCALE: z.string(),
    NEXT_PUBLIC_OFFICIAL_WEBSITE_URL_GLOBAL: z.string(),
    NEXT_PUBLIC_OFFICIAL_WEBSITE_URL_CHINA: z.string(),
  },
  // Runtime environment configuration
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_302_API_KEY: process.env.NEXT_PUBLIC_302_API_KEY,
    NEXT_PUBLIC_AUTH_PATH: process.env.NEXT_PUBLIC_AUTH_PATH,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_AUTH_API_URL: process.env.NEXT_PUBLIC_AUTH_API_URL,
    NEXT_PUBLIC_OFFICIAL_WEBSITE_URL_GLOBAL:
      process.env.NEXT_PUBLIC_OFFICIAL_WEBSITE_URL_GLOBAL,
    NEXT_PUBLIC_OFFICIAL_WEBSITE_URL_CHINA:
      process.env.NEXT_PUBLIC_OFFICIAL_WEBSITE_URL_CHINA,
    NEXT_PUBLIC_DEFAULT_REGION: process.env.NEXT_PUBLIC_DEFAULT_REGION,
    NEXT_PUBLIC_DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
    NEXT_PUBLIC_DEFAULT_MODEL_NAME: process.env.NEXT_PUBLIC_DEFAULT_MODEL_NAME,
    NEXT_PUBLIC_DEV_HOST_NAME: process.env.NEXT_PUBLIC_DEV_HOST_NAME,
  },
  // Handle validation errors
  onValidationError: (error: ZodError) => {
    console.error(
      "❌ Invalid environment variables:",
      error.flatten().fieldErrors
    );
    process.exit(1);
  },
  emptyStringAsUndefined: true, // Treat empty strings as undefined
});
