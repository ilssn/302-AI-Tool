"use client";

import LangSwitcher from "./lang-switcher";
import ThemeSwitcher from "./theme-switcher";

type AppNavbarProps = {
  locale: string;
};
export default function AppNavbar({ locale }: AppNavbarProps) {
  return (
    <nav className="sticky top-0 flex w-full items-center justify-between space-x-2 bg-background/95 p-2 shadow-sm">
      <div className="flex justify-start"></div>
      <div className="flex justify-end">
        <LangSwitcher locale={locale} />
        <ThemeSwitcher />
      </div>
    </nav>
  );
}
