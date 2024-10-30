import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";

import AppFooter from "@/components/global/app-footer";
import AppMessage from "@/components/global/app-message";
import AppNavbar from "@/components/global/app-navbar";
import AppQeury from "@/components/global/app-query";
import AppTheme from "@/components/global/app-theme";
import { serverTranslation } from "@/i18n";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

const AppAuth = dynamic(() => import("@/components/global/app-auth"), {
  ssr: false,
});
const AppChat = dynamic(() => import("@/components/global/app-chat"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

type Props = {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale;
  const { t } = await serverTranslation(locale);

  return {
    title: {
      template: `%s - ${t("global:title")}`,
      default: t("global:title"),
    },
    description: t("global:desc"),
  };
}

const RootLayout = ({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) => {
  return (
    <html lang={locale} suppressHydrationWarning className="dark">
      <head></head>
      <body className={cn(inter.className, "h-screen w-screen")}>
        <AppAuth />
        <AppTheme>
          <AppQeury>
            <AppNavbar locale={locale} />
            <main className="flex grow">{children}</main>
            <AppFooter locale={locale} />
          </AppQeury>
        </AppTheme>
        <AppChat />
        <AppMessage />
      </body>
    </html>
  );
};

export default RootLayout;
