import { NextRequest, NextResponse } from "next/server";

import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

import { Lang, defaultLocale, locales } from "@/i18n/config";

function getLocale(request: NextRequest): Lang {
  const headers = {
    "accept-language": request.headers.get("accept-language") || "",
  };

  const negotiator = new Negotiator({ headers });
  const languages = negotiator.languages();

  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest): Response | void {
  const { pathname } = request.nextUrl;

  // Check if the path already includes a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Return if locale is present in the path
  if (pathnameHasLocale) return;

  // Get the best matching locale
  const locale = getLocale(request);

  // Redirect to the path with the locale
  const redirectURL = new URL(request.nextUrl);
  redirectURL.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(redirectURL);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images/*|favicon.ico).*)"],
};
