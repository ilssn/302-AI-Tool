"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import FormGenerator from "@/components/common/form-generator";
import { Button } from "@/components/ui/button";
import { FORM_CONSTANTS } from "@/constants";
import { useClientTranslation } from "@/hooks/global";
import { cn } from "@/lib/utils";
import { useAppSession } from "@/stores";
import { TaskType } from "@/stores/slices/task-slice";

import { VideoSchema } from "./schema";

// Define the type for authentication data
type DefaultVideoData = {
  model: string;
  prompt: string;
  firstFrame: null | File;
  lastFrame: null | File;
};

const VideoForm = () => {
  const addTask = useAppSession((state) => state.addTask);
  const [showFields, setShowFields] = useState<string[]>([]);
  const { t } = useClientTranslation();

  const {
    watch,
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<DefaultVideoData>({
    defaultValues: {
      model: "kling",
      prompt: "",
      firstFrame: null,
      lastFrame: null,
    },
    resolver: zodResolver(VideoSchema),
  });

  const _onSubmit = (data: DefaultVideoData) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key]) => showFields.includes(key))
    );
    console.log("filteredData::", filteredData);
    addTask(filteredData, TaskType.VIDEO_GENERATION);
    // Submit filteredData instead of data
  };

  const modelValue = watch("model");
  const firstFrame = watch("firstFrame");
  const lastFrame = watch("lastFrame");

  useEffect(() => {
    // Dynamically update visible fields based on model value
    switch (modelValue) {
      case "kling":
        if (firstFrame) {
          setShowFields(["model", "firstFrame"]);
        } else {
          setShowFields(["model", "lastFrame"]);
        }
        break;
      default:
        setShowFields(["model", "prompt", "firstFrame", "lastFrame"]);
        break;
    }
  }, [modelValue, firstFrame, lastFrame]);

  return (
    <form
      className="grid w-full items-center gap-4"
      onSubmit={handleSubmit(_onSubmit)}
    >
      {FORM_CONSTANTS.videoForm.map((field) => (
        <FormGenerator
          {...field}
          key={field.id}
          watch={watch}
          register={register}
          getValues={getValues}
          setValue={setValue}
          errors={errors}
          className={cn("flex flex-col space-y-1.5", {
            hidden: !showFields.includes(field.name),
          })}
        />
      ))}
      <Button type="submit">{t("v-gen:action.create_video")}</Button>
    </form>
  );
};

export default VideoForm;
