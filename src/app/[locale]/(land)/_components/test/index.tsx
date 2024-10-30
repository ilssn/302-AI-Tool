"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { env } from "@/env";
import {
  useClientTranslation,
  useIsAuthed,
  useLocaleRouter,
} from "@/hooks/global";
import { emitter } from "@/lib/mitt";
import { useAppSession } from "@/stores";

const LogOutButton = () => {
  const { t } = useClientTranslation();
  const { pushRouter } = useLocaleRouter();
  const updateConfig = useAppSession((state) => state.updateConfig);
  const handleLogout = () => {
    updateConfig({ apiKey: "", code: "" });
    localStorage.setItem("code", "");
    sessionStorage.setItem("code", "");
    pushRouter(env.NEXT_PUBLIC_AUTH_PATH);
  };
  return <Button onClick={handleLogout}>{t("global:system.logout")}</Button>;
};

const Test = () => {
  const { t } = useClientTranslation();
  const isAuthed = useIsAuthed();

  useEffect(() => {
    if (isAuthed) emitter.emit("ToastSuccess", t("land:welcome"));
  }, [isAuthed, t]);

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-4 p-4 text-center">
      {isAuthed && <LogOutButton />}
    </div>
  );
};

export default Test;
