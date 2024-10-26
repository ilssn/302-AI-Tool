/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from "react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useClientTranslation } from "@/hooks/global";
import { cn } from "@/lib/utils";

import TransRenderer from "../trans-renderer";

type FormGeneratorProps = {
  name: string;
  label?: string;
  placeholder?: string;
  type: "select" | "input" | "textarea" | "checkbox" | "upload";
  inputType?: "text" | "email" | "password" | "number" | "checkbox";
  selectOptions?: { value: string; label: string; id: string }[];
  textareaRows?: number;
  className?: string;
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch: (name: string, defaultValue: any) => any;
};

const FormGenerator = ({
  name,
  label,
  placeholder,
  type,
  inputType = "text",
  selectOptions,
  textareaRows,
  className,
  errors,
  register,
  setValue,
  watch,
}: FormGeneratorProps) => {
  const { t } = useClientTranslation();
  const [dragEnter, setDragEnter] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileDrop = useCallback(
    (files: FileList) => {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        setValue(name, file);
      }
    },
    [name, setValue]
  );

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragEnter(true);
  };

  const handleDragLeave = () => {
    setDragEnter(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragEnter(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      handleFileDrop(event.dataTransfer.files);
    }
  };

  const clearFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPreview(null);
    setValue(name, null);
  };

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
    <Label htmlFor={`input-${name}`} className={className}>
      <p>{label && t(label)}</p>
      <Input
        id={`input-${name}`}
        type={inputType}
        placeholder={placeholder && t(placeholder)}
        {...register(name)}
      />
      {renderErrorMessage()}
    </Label>
  );

  const renderTextarea = () => (
    <Label htmlFor={`textarea-${name}`} className={className}>
      <p>{label && t(label)}</p>
      <Textarea
        id={`textarea-${name}`}
        placeholder={placeholder && t(placeholder)}
        {...register(name)}
        rows={textareaRows}
      />
      {renderErrorMessage()}
    </Label>
  );

  const renderSelect = () => {
    const currentValue = watch(name, "");
    return (
      <Label htmlFor={`select-${name}`} className={className}>
        <p>{label && t(label)}</p>
        <Select
          name={name}
          value={currentValue}
          onValueChange={(value) => {
            setValue(name, value);
          }}
        >
          <SelectTrigger id={`select-${name}`}>
            <SelectValue placeholder={placeholder && t(placeholder)} />
          </SelectTrigger>
          <SelectContent position="popper">
            {selectOptions?.map((option) => (
              <SelectItem value={option.value} key={option.id}>
                {t(option.label)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {renderErrorMessage()}
      </Label>
    );
  };

  const renderCheckbox = () => {
    const watchCheckbox = watch(name, true);
    return (
      <Label
        className={cn("flex items-center gap-2", className)}
        htmlFor={`checkbox-${label}`}
      >
        <Checkbox
          id={`checkbox-${name}`}
          {...register(name)}
          checked={watchCheckbox}
          onCheckedChange={(checked) => setValue(name, checked)}
        />
        {label && t(label)}
      </Label>
    );
  };

  const renderUpload = () => (
    <Label
      htmlFor={`upload-${name}`}
      className={cn(
        "rounded-lg border border-2 border-dashed p-4 hover:border-primary",
        className,
        {
          "border-gray-400": !dragEnter,
          "border-blue-400": dragEnter,
        }
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p>{label && t(label)}</p>
      <input
        id={`upload-${name}`}
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files && handleFileDrop(e.target.files)}
        className="hidden"
      />
      <p className="mt-2 text-center text-gray-500">
        {t("Drag and drop an image here or click to upload")}
      </p>
      {preview && (
        <div className="mt-4">
          <img src={preview} alt="Preview" className="h-auto w-full" />
          <button onClick={clearFile} className="mt-2 text-blue-500">
            {t("Clear")}
          </button>
        </div>
      )}
      {renderErrorMessage()}
    </Label>
  );

  switch (type) {
    case "input":
      return renderInput();
    case "select":
      return renderSelect();
    case "textarea":
      return renderTextarea();
    case "checkbox":
      return renderCheckbox();
    case "upload":
      return renderUpload();
    default:
      return null;
  }
};

export default FormGenerator;
