import { Dispatch, SetStateAction, useMemo } from "react";

import { useTheme } from "next-themes";

export type Theme = "dark" | "light" | "system";
export type SetTheme = Dispatch<SetStateAction<Theme>>;

export const useAppTheme = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  return useMemo(() => {
    return {
      theme: theme === "system" ? systemTheme : theme,
      setTheme,
    } as { theme: Theme; setTheme: SetTheme };
  }, [theme, setTheme, systemTheme]);
};
