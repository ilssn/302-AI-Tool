import { env } from "@/env";
import { Home, Lock } from "@/icons";

export type MenuProps = {
  id: number;
  label: string;
  icon: JSX.Element;
  path: string;
  section?: boolean;
  integration?: boolean;
  auth?: boolean;
};

export const APP_ROUTE_MENU: MenuProps[] = [
  {
    id: 0,
    label: "global:title",
    icon: <Home />,
    path: "",
    auth: true,
  },
  {
    id: 1,
    label: "land:title",
    icon: <Lock />,
    path: env.NEXT_PUBLIC_AUTH_PATH,
    auth: false,
  },
];
