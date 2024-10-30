"use client";

import ky from "ky";

import { env } from "@/env";
import { emitter } from "@/lib/mitt";
import { useAppSession } from "@/stores";

import { langToCountry } from "./utils";

// Create a ky instance for API requests with custom hooks
const apiKy = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_URL, // Base URL for the API
  timeout: 60000, // Timeout set to 60 seconds
  hooks: {
    beforeRequest: [
      (request) => {
        // Get the apiKey and language from the application state
        const { apiKey, language } = useAppSession.getState();

        // Set Authorization header if apiKey exists
        if (apiKey) {
          request.headers.set("Authorization", `Bearer ${apiKey}`);
        }

        // Set language header if language exists
        if (language) {
          request.headers.set("Lang", langToCountry(language));
        }
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        // Handle HTTP errors by emitting a 'ToastError' event
        if (!response.ok) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const res = (await response.json()) as any;

          // Emit a toast error if there is an error code
          const { language } = useAppSession.getState();
          if (res.error && language) {
            // Get the apiKey and language from the application state
            const message =
              res.error[langToCountry(language)] || res.error["message"];
            emitter.emit("ToastError", message);
          }
        }
      },
    ],
  },
});

// Create a ky instance for authentication-related requests
const authKy = ky.create({
  prefixUrl: env.NEXT_PUBLIC_AUTH_API_URL, // Base URL for the authentication API
  timeout: 60000, // Timeout set to 60 seconds
  hooks: {
    beforeRequest: [
      (request) => {
        // Get the language from the application state and set the header
        const { language } = useAppSession.getState();
        if (language) {
          request.headers.set("Lang", langToCountry(language));
        }
      },
    ],
  },
});

export { apiKy, authKy };
