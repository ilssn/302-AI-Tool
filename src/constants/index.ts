import { AuthFormProps, SIGN_IN_FORM } from "./forms";
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
  signInForm: AuthFormProps[];
};

export const FORM_CONSTANTS: FormConstantsProps = {
  signInForm: SIGN_IN_FORM,
};

// Land
