import Link from "next/link";
import { useParams } from "next/navigation";

import { Trans } from "react-i18next";

import { env } from "@/env";
import { useDomain } from "@/hooks/global";

type TransRendererProps = {
  transKey?: string;
  content?: string;
  website?: string;
};

const TransRenderer = ({
  transKey = "",
  content = "",
  website,
}: TransRendererProps) => {
  const { locale } = useParams();
  const defaultWebsite = useDomain();
  return (
    <Trans
      // t={t}
      i18nKey={transKey} // optional -> fallbacks to defaults if not provided
      defaults={
        content ||
        "<bold>welcome</bold> <italic>to</italic> <site>{{name}}</site>"
      }
      values={{ name: "302.AI" }}
      components={{
        italic: <i />,
        bold: <strong />,
        login: (
          <Link
            href={`/${locale}${env.NEXT_PUBLIC_AUTH_PATH}`}
            className="!text-primary underline"
            rel="noreferrer"
            locale="fr"
          />
        ),
        site: (
          <a
            href={website || defaultWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          />
        ),
      }}
    />
  );
};

export default TransRenderer;
