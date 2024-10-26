import { createEnv } from "@t3-oss/env-nextjs";
import { ZodError, z } from "zod";

// Define and validate the environment variables
export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]), // Ensure NODE_ENV is either 'development' or 'production'
  },
  client: {
    // base
    NEXT_PUBLIC_API_KEY: z.string(),
    NEXT_PUBLIC_FETCH_API_URL: z.string(),
    NEXT_PUBLIC_UPLOAD_API_URL: z.string(),
    // website
    NEXT_PUBLIC_GLOBAL_WEBSITE_URL: z.string(),
    NEXT_PUBLIC_CHINA_WEBSITE_URL: z.string(),
    // default
    NEXT_PUBLIC_DEFALT_MODEL_NAME: z.string(),
    NEXT_PUBLIC_DEFAULT_REGION: z.string(),
    NEXT_PUBLIC_DEFAULT_LOCALE: z.string(),
  },
  // Runtime environment configuration
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,

    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    NEXT_PUBLIC_FETCH_API_URL: process.env.NEXT_PUBLIC_FETCH_API_URL,
    NEXT_PUBLIC_UPLOAD_API_URL: process.env.NEXT_PUBLIC_UPLOAD_API_URL,

    NEXT_PUBLIC_GLOBAL_WEBSITE_URL: process.env.NEXT_PUBLIC_GLOBAL_WEBSITE_URL,
    NEXT_PUBLIC_CHINA_WEBSITE_URL: process.env.NEXT_PUBLIC_CHINA_WEBSITE_URL,

    NEXT_PUBLIC_DEFALT_MODEL_NAME: process.env.NEXT_PUBLIC_DEFALT_MODEL_NAME,
    NEXT_PUBLIC_DEFAULT_REGION: process.env.NEXT_PUBLIC_DEFAULT_REGION,
    NEXT_PUBLIC_DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
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
