import { Metadata } from "next";

import { serverTranslation } from "@/i18n";

import LandHeader from "./_components/header";
import Test from "./_components/test";

type Props = {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale;
  const { t } = await serverTranslation(locale);

  return {
    title: t("land:title"),
  };
}

interface pageProps {
  params: {
    locale: string;
  };
}

const HomePage = async ({ params: { locale } }: pageProps) => {
  const { t } = await serverTranslation(locale);

  return (
    <div className="flex w-full flex-col items-center p-8">
      <LandHeader title={t("land:title")} />
      <p>{t("land:desc")}</p>
      <Test />
    </div>
  );
};

export default HomePage;
