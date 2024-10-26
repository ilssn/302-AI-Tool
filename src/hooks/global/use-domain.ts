"use client";

import { env } from "@/env";
import { useAppSession } from "@/stores";

export const useDomain = () => {
  const region = useAppSession((state) => state.region);

  const domain =
    region == "0"
      ? env.NEXT_PUBLIC_CHINA_WEBSITE_URL
      : env.NEXT_PUBLIC_GLOBAL_WEBSITE_URL;
  return domain;
};
