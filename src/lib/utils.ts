import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge and convert class names
export function cn(...inputs: ClassValue[]) {
  // Convert class names with clsx and merge identical Tailwind classes with twMerge
  return twMerge(clsx(inputs));
}

// Recursively merge source object data into target object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mergeData = (target: any, source: any): void => {
  Object.keys(source).forEach((key) => {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      if (
        !target[key] ||
        typeof target[key] !== "object" ||
        Array.isArray(target[key])
      ) {
        target[key] = {}; // Initialize target key as object if necessary
      }
      mergeData(target[key], source[key]); // Recursively merge if necessary
    } else {
      target[key] = source[key]; // Directly assign value if not an object
    }
  });
};

// Convert language code to country code
export function langToCountry(lang: string) {
  const map: Record<string, string> = {
    zh: "cn",
    en: "en",
    ja: "jp",
  };
  return map[lang] ?? lang; // Return mapped code or default to input
}

// Check if a string contains Chinese characters
export const containsChinese = (str: string): boolean =>
  /[\u4E00-\u9FA5]/.test(str);

// Copy text data to clipboard
export const copyToClipboard = (text: string): void => {
  if (!text) return; // Exit if empty text
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).catch((err) => {
      console.error("Failed to copy to clipboard: ", err);
    });
  } else {
    // Fallback for environments without clipboard API support
    const textarea = document.createElement("textarea");
    textarea.style.position = "fixed";
    textarea.style.top = "0";
    document.body.appendChild(textarea);
    textarea.value = text;
    textarea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Failed to copy using execCommand: ", err);
    }
    document.body.removeChild(textarea);
  }
};
