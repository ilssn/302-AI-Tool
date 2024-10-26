export type VideoFormProps = {
  id: number;
  name: string;
  label?: string;
  placeholder?: string;
  type: "select" | "input" | "textarea" | "checkbox" | "upload";
  inputType?: "text" | "email" | "password" | "number" | "checkbox";
  textareaRows?: number;
  selectOptions?: { value: string; label: string; id: string }[];
};

export const VIDEO_FORM: VideoFormProps[] = [
  {
    id: 1,
    name: "model",
    label: "v-gen:form.model.title",
    placeholder: "v-gen:form.model.desc",
    type: "select",
    selectOptions: [
      {
        id: "1",
        value: "luma",
        label: "v-gen:form.model.luma",
      },
      {
        id: "2",
        value: "kling",
        label: "v-gen:form.model.kling",
      },
      {
        id: "3",
        value: "runway",
        label: "v-gen:form.model.runway",
      },
    ],
  },
  {
    id: 2,
    name: "prompt",
    label: "v-gen:form.prompt.title",
    placeholder: "v-gen:form.prompt.desc",
    type: "textarea",
    textareaRows: 3,
  },
  {
    id: 3,
    name: "firstFrame",
    label: "v-gen:form.first_frame.title",
    placeholder: "v-gen:form.first_frame.desc",
    type: "upload",
  },
  {
    id: 4,
    name: "lastFrame",
    label: "v-gen:form.last_frame.title",
    placeholder: "v-gen:form.last_frame.desc",
    type: "upload",
  },
  {
    id: 5,
    name: "time",
    label: "v-gen:form.model.title",
    placeholder: "v-gen:form.model.desc",
    type: "select",
    selectOptions: [
      {
        id: "1",
        value: "5",
        label: "v-gen:form.model.luma",
      },
      {
        id: "2",
        value: "10",
        label: "v-gen:form.model.kling",
      },
    ],
  },
];
