/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React, { useCallback, useState } from "react";

import { ErrorMessage } from "@hookform/error-message";
import { UploadIcon } from "lucide-react";
import {
  FieldErrors,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { IoIosCloseCircle } from "react-icons/io";

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
  getValues: UseFormGetValues<any>;
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
  getValues,
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

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragEnter(true);
  };

  const handleDragLeave = () => {
    setDragEnter(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragEnter(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      handleFileDrop(event.dataTransfer.files);
    }
  };

  const clearFile = (e: React.MouseEvent<HTMLDivElement>) => {
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
    const currentValue = watch(name, getValues(name));
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
    <Label htmlFor={`upload-${name}`} className={className}>
      <p>{label && t(label)}</p>
      {preview ? (
        <div className="relative w-full rounded-md bg-background p-2">
          <Image
            width={100}
            height={100}
            src={preview}
            alt="first image"
            style={{ width: "100%", height: "auto" }}
          ></Image>
          <div
            className="absolute right-0 top-0 hover:scale-110"
            onClick={clearFile}
          >
            <IoIosCloseCircle className="cursor-pointer rounded-full bg-red-100 text-xl text-red-500" />
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "rounded-lg border-2 border-dashed p-2 text-slate-500 hover:border-primary hover:text-primary",
            {
              "border-gray-400": !dragEnter,
              "border-primary text-primary": dragEnter,
            }
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex w-full flex-col items-center justify-center rounded-lg p-1">
            <input
              id={`upload-${name}`}
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && handleFileDrop(e.target.files)}
              className="hidden"
            />
            <UploadIcon />
            <p className="mt-2 text-center">{placeholder && t(placeholder)}</p>
          </div>
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
