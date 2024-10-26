import { useParams, usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

import { APP_CONSTANTS } from "@/constants";

export const useLocaleRouter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams();

  // check if need auth router
  const isAuthRouter = useMemo(
    () =>
      APP_CONSTANTS.appRouteMenu
        .filter((it) => it.auth)
        .map((menu) => `/${locale}${menu.path}`)
        .includes(pathname),
    [pathname, locale]
  );

  // replace router
  const replaceLocale = (newLocale: string) => {
    const oldLocale = `/${locale}`;
    router.replace(`/${pathname.replace(oldLocale, newLocale)}`);
  };

  // replace router
  const replaceRouter = (path: string) => {
    router.replace(`/${locale}${path}`);
  };

  // push router
  const pushRouter = (path: string) => {
    router.push(`/${locale}${path}`);
  };

  // keep path only
  const removeParams = () => {
    if (typeof window !== "undefined" && pathname) {
      window.history.replaceState({}, "", pathname);
    }
  };

  return {
    isAuthRouter,
    replaceLocale,
    replaceRouter,
    pushRouter,
    removeParams,
  };
};
