import AppLogo from "@/components/global/app-logo";
import { serverTranslation } from "@/i18n";

type AppFooterProps = {
  locale: string;
};
const AppFooter = async ({ locale }: AppFooterProps) => {
  const { t } = await serverTranslation(locale);
  return (
    <footer className="flex w-full">
      <div className="flex w-full flex-col items-center justify-center space-y-1 p-1">
        <div className="flex items-center justify-center">
          <div className="text-xs text-[#666]">{t("global:footer.title")}</div>
          <AppLogo className="w-12" />
        </div>
        <div className="flex justify-center text-center text-xs text-gray-400">
          {t("global:footer.desc")}
        </div>
      </div>
    </footer>
  );
};
export default AppFooter;
