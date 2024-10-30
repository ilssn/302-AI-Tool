export type OptionProps = {
  id: number;
  label: string;
  value: string;
};

export const APP_THEME_OPTION: OptionProps[] = [
  {
    id: 1,
    label: "global:theme.light",
    value: "light",
  },
  {
    id: 2,
    label: "global:theme.dark",
    value: "dark",
  },
  {
    id: 3,
    label: "global:theme.system",
    value: "system",
  },
];
