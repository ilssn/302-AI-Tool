import { env } from "@/env";

type LangOption = {
  label: string;
  value: string;
};

export const languages: LangOption[] = [
  { label: "中文", value: "zh" },
  { label: "English", value: "en" },
  { label: "日本語", value: "ja" },
];

export type Lang = (typeof languages)[number]["value"];

export const defaultLocale: Lang = env.NEXT_PUBLIC_DEFAULT_LOCALE;

export const locales = languages.map((it) => it.value);

export const namespaces = ["global", "auth", "land", "v-gen"];
