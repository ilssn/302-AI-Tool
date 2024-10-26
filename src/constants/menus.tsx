import { Home } from "@/icons";

export type MenuProps = {
  id: number;
  label: string;
  icon: JSX.Element;
  path: string;
  auth?: boolean;
};

export const APP_ROUTE_MENU: MenuProps[] = [
  {
    id: 0,
    label: "v-gen:title",
    icon: <Home />,
    path: "",
    auth: true,
  },
];
