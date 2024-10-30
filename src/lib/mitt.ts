"use client";

import mitt from "mitt";

export type ErrorEvent = {
  ToastError: string;
  ToastSuccess: string;
};
const emitter = mitt<ErrorEvent>();

export { emitter };
