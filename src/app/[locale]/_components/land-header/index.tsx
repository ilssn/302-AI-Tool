import AppLogo from "@/components/global/app-logo";

type Props = {
  title: string;
};

const LandHeader = (props: Props) => {
  return (
    <section className="flex items-center justify-center">
      <div className="flex items-center space-x-2">
        <AppLogo
          type="mini"
          width={50}
          height={50}
          className="w-[40px] md:w-[50px]"
        />
        <h2 className="text-2xl font-medium md:text-4xl">{props.title}</h2>
      </div>
    </section>
  );
};

export default LandHeader;
