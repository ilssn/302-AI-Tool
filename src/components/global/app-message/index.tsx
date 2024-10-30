"use client";

import { useEffect } from "react";

import TransRenderer from "@/components/common/trans-renderer";
import { Toaster } from "@/components/ui/toaster";
import { useClientTranslation } from "@/hooks/global";
import { useToast } from "@/hooks/global/use-toast";
import { emitter } from "@/lib/mitt";

const AppMessage = () => {
  const { toast } = useToast();
  const { t } = useClientTranslation();

  useEffect(() => {
    // Handler for success messages
    const handleToastSuccess = (msg: string) => {
      toast({
        title: t("global:system.notifi"),
        // Renders the message using the HostRenderer component
        description: <TransRenderer content={msg} />,
      });
    };

    // Handler for error messages
    const handleToastError = (msg: string) => {
      toast({
        variant: "destructive",
        title: t("global:system.error"),
        // Renders the message using the HostRenderer component
        description: <TransRenderer content={msg} />,
      });
    };

    // Todo: Modal

    // Listen for success and error events
    emitter.on("ToastSuccess", handleToastSuccess);
    emitter.on("ToastError", handleToastError);

    // Cleanup listeners on component unmount
    return () => {
      emitter.off("ToastSuccess", handleToastSuccess);
      emitter.off("ToastError", handleToastError);
    };
  }, [toast, t]); // Dependency array ensures the effect is set up again if toast changes

  return <Toaster />; // Render the Toaster component
};

export default AppMessage;
