"use client";

import { FormEvent } from "react";

import FormGenerator from "@/components/common/form-generator";
import { CircleLoader } from "@/components/common/loader-renderer";
import { Button } from "@/components/ui/button";
import { FORM_CONSTANTS } from "@/constants";
import useAuth from "@/hooks/auth";
import { useClientTranslation } from "@/hooks/global";

const SignInForm = () => {
  const { t } = useClientTranslation();
  const { isPending, setValue, onAuth, watch, register, errors } = useAuth();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onAuth();
  };

  return (
    <form
      className="mt-4 flex w-full max-w-sm flex-col items-center gap-3"
      onSubmit={handleSubmit}
    >
      {FORM_CONSTANTS.signInForm.slice(0, 1).map((field) => (
        <FormGenerator
          {...field}
          key={field.id}
          watch={watch}
          register={register}
          setValue={setValue}
          errors={errors}
          className="w-[220px] text-center"
        />
      ))}
      <Button type="submit" className="w-[220px] cursor-pointer rounded-md">
        <CircleLoader loading={isPending}>
          {t("auth:form.confirm")}
        </CircleLoader>
      </Button>
      {FORM_CONSTANTS.signInForm.slice(1).map((field) => (
        <FormGenerator
          {...field}
          key={field.id}
          watch={watch}
          register={register}
          setValue={setValue}
          errors={errors}
          className="w-[220px] text-center"
        />
      ))}
    </form>
  );
};

export default SignInForm;
