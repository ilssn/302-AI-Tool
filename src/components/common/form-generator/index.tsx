/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage } from "@hookform/error-message";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useClientTranslation } from "@/hooks/global";
import { cn } from "@/lib/utils";

import TransRenderer from "../trans-renderer";

type FormGeneratorProps = {
  inputType: "select" | "input" | "textarea" | "checkbox";
  name: string;
  errors: FieldErrors<FieldValues>;
  type?: "text" | "email" | "password" | "number" | "checkbox";
  options?: { value: string; label: string; id: string }[];
  placeholder?: string;
  label?: string;
  lines?: number;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch: (name: string, defaultValue: any) => any;
  className?: string;
};

const FormGenerator = ({
  inputType,
  options,
  label,
  placeholder,
  register,
  setValue,
  name,
  errors,
  type = "text",
  lines,
  watch,
  className,
}: FormGeneratorProps) => {
  const { t } = useClientTranslation();
  const renderErrorMessage = () => (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) =>
        message !== "Required" && (
          <p className="mt-2 text-red-400">
            <TransRenderer content={message} />
          </p>
        )
      }
    />
  );

  const renderInput = () => (
    <Label
      className="flex flex-col items-center justify-center gap-2 text-center"
      htmlFor={`input-${label}`}
    >
      {label}
      <Input
        id={`input-${label}`}
        type={type}
        placeholder={placeholder && t(placeholder)}
        className={cn(
          "bg-themeBlack border-themeGray text-themeTextGray",
          className
        )}
        {...register(name)}
      />
      {renderErrorMessage()}
    </Label>
  );

  const renderSelect = () => (
    <Label htmlFor={`select-${label}`} className="flex flex-col gap-2">
      {label && t(label)}
      <select
        id={`select-${label}`}
        className="w-full rounded-lg border bg-transparent p-3"
        {...register(name)}
      >
        {options?.map((option) => (
          <option
            value={option.value}
            key={option.id}
            className="dark:bg-muted"
          >
            {t(option.label)}
          </option>
        ))}
      </select>
      {renderErrorMessage()}
    </Label>
  );

  const renderTextarea = () => (
    <Label className="flex flex-col gap-2" htmlFor={`input-${label}`}>
      {label && t(label)}
      <Textarea
        className=""
        id={`input-${label}`}
        placeholder={placeholder}
        {...register(name)}
        rows={lines}
      />
      {renderErrorMessage()}
    </Label>
  );

  const renderCheckbox = () => {
    const watchCheckbox = watch(name, true);
    return (
      <Label className="flex items-center gap-2" htmlFor={`checkbox-${label}`}>
        <Checkbox
          id={`checkbox-${label}`}
          {...register(name)}
          checked={watchCheckbox}
          onCheckedChange={(checked) => setValue(name, checked)}
        />
        {label && t(label)}
      </Label>
    );
  };

  switch (inputType) {
    case "input":
      return renderInput();
    case "select":
      return renderSelect();
    case "textarea":
      return renderTextarea();
    case "checkbox":
      return renderCheckbox();
    default:
      return null;
  }
};

export default FormGenerator;
