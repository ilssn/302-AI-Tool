"use client";

import { env } from "@/env";
import { useAppSession } from "@/stores";

export const useDomain = () => {
  const region = useAppSession((state) => state.region);

  const domain =
    region == "0"
      ? env.NEXT_PUBLIC_OFFICIAL_WEBSITE_URL_CHINA
      : env.NEXT_PUBLIC_OFFICIAL_WEBSITE_URL_GLOBAL;
  return domain;
};
