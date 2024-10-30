import {
  FlatNamespace,
  i18n as I18nInstance,
  InitOptions,
  KeyPrefix,
  createInstance,
} from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { FallbackNs } from "react-i18next";
import { initReactI18next } from "react-i18next/initReactI18next";

import { defaultLocale, locales, namespaces } from "@/i18n/config";

export type UseTranslationOptions = {
  keyPrefix?: string;
};

const initI18next = async (
  lng: string = defaultLocale,
  ns: string | string[]
): Promise<I18nInstance> => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init({
      supportedLngs: locales,
      fallbackLng: defaultLocale,
      lng,
      fallbackNS: namespaces[0],
      defaultNS: namespaces[0],
      ns: ns || namespaces,
    } as InitOptions);
  return i18nInstance;
};

export async function serverTranslation<
  Ns extends FlatNamespace,
  KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined,
>(lng: string, ns?: Ns, options: { keyPrefix?: KPrefix } = {}) {
  const i18nextInstance = await initI18next(
    lng,
    Array.isArray(ns) ? (ns as string[]) : (ns as string)
  );
  return {
    t: i18nextInstance.getFixedT(lng, ns, options.keyPrefix),
    i18n: i18nextInstance,
  };
}
