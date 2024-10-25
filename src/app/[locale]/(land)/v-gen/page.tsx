import { Metadata } from "next";

import { serverTranslation } from "@/i18n";

import LandHeader from "./_components/land-header";
import TaskConsumer from "./_components/task-consumer";
import TaskProducer from "./_components/task-producer";

// import TaskConsumer from "./_components/task-consumer";
// import TaskProducer from "./_components/task-producer";

type Props = {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale;
  const { t } = await serverTranslation(locale);

  return {
    title: t("v-gen:title"),
    description: t("v-gen:desc"),
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
    <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-4 p-4 md:gap-8 md:p-8">
      <section className="flex w-full flex-col items-center justify-center">
        <LandHeader title={t("v-gen:title")} />
      </section>

      <section className="relative flex w-full flex-1 flex-col gap-4 md:flex-row md:gap-8">
        <div className="w-full md:w-[350px]">
          <TaskProducer />
        </div>
        <div className="relative flex-1">
          <TaskConsumer className="absolute bottom-0 left-0 top-0 w-full overflow-scroll scroll-smooth"></TaskConsumer>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
