import { VIDEO_FORM, VideoFormProps } from "./forms";
import { APP_ROUTE_MENU, MenuProps } from "./menus";
import { APP_THEME_OPTION, OptionProps } from "./options";

// APP
type AppConstantsProps = {
  appRouteMenu: MenuProps[];
  appThemeOption: OptionProps[];
};

export const APP_CONSTANTS: AppConstantsProps = {
  appRouteMenu: APP_ROUTE_MENU,
  appThemeOption: APP_THEME_OPTION,
};

// Form
type FormConstantsProps = {
  videoForm: VideoFormProps[];
};

export const FORM_CONSTANTS: FormConstantsProps = {
  videoForm: VIDEO_FORM,
};
