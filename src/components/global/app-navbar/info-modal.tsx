"use client";

import { InfoIcon } from "lucide-react";

import { DotLoader } from "@/components/common/loader-renderer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useClientTranslation, useInfo } from "@/hooks/global";
import "@/styles/info.css";

export function InfoModal() {
  const { t } = useClientTranslation();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant={"ghost"}>
          <InfoIcon className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t("global:about.title")}</DialogTitle>
          <DialogDescription className="">
            {t("global:about.desc")}
          </DialogDescription>
        </DialogHeader>
        <InfoContent />
      </DialogContent>
    </Dialog>
  );
}

export function InfoContent() {
  const { data, isLoading, error } = useInfo();
  if ((!error && !data) || isLoading) return <DotLoader />;

  if (data?.data) {
    return (
      <div
        className="text-sm"
        dangerouslySetInnerHTML={{ __html: data.data.info }}
      ></div>
    );
  }
}
