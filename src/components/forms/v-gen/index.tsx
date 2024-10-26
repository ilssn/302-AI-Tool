"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import FormGenerator from "@/components/common/form-generator";
import { Button } from "@/components/ui/button";
import { FORM_CONSTANTS } from "@/constants";
import { useClientTranslation } from "@/hooks/global";

import { VideoSchema } from "./schema";

// Define the type for authentication data
type DefaultVideoData = {
  model: string;
  prompt: string;
  firstFrame: null | File;
  lastFrame: null | File;
};

const VideoForm = () => {
  const { t } = useClientTranslation();
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DefaultVideoData>({
    defaultValues: {
      model: "", // Default code to empty string
      prompt: "", // Default remember to true
      firstFrame: null,
      lastFrame: null,
    },
    resolver: zodResolver(VideoSchema),
  });

  const _onSubmit = (data: DefaultVideoData) => {
    // event.preventDefault();
    console.log("data::", data);
    // onAuth();
  };

  // `watch` 可以用于监控字段的值
  // const watchFields = watch(["model", "prompt", "firstFrame"]);

  // React.useEffect(() => {
  //   // 当监控的字段中的任何一个发生变化时，这个 useEffect 会被触发
  //   console.log("model or prompt: ", watchFields);
  // }, [watchFields]);

  return (
    <form
      className="grid w-full items-center gap-4"
      onSubmit={handleSubmit(_onSubmit)}
    >
      {FORM_CONSTANTS.videoForm.slice(0, 2).map((field) => (
        <FormGenerator
          {...field}
          key={field.id}
          watch={watch}
          register={register}
          setValue={setValue}
          errors={errors}
          className="flex flex-col space-y-1.5"
        />
      ))}
      <div className="flex gap-4">
        {FORM_CONSTANTS.videoForm
          .filter((it) => it.type === "upload")
          .map((field) => (
            <FormGenerator
              {...field}
              key={field.id}
              watch={watch}
              register={register}
              setValue={setValue}
              errors={errors}
              className="flex flex-1 flex-col space-y-1.5"
            />
          ))}
      </div>
      {FORM_CONSTANTS.videoForm
        .slice(2)
        .filter((it) => it.type !== "upload")
        .map((field) => (
          <FormGenerator
            {...field}
            key={field.id}
            watch={watch}
            register={register}
            setValue={setValue}
            errors={errors}
            className="flex flex-col space-y-1.5"
          />
        ))}
      <Button type="submit">{t("v-gen:action.create_video")}</Button>
    </form>
  );
};

export default VideoForm;
