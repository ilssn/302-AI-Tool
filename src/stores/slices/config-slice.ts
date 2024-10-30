import { produce } from "immer";
import { StateCreator } from "zustand";

import { env } from "@/env";

type ConfigState = {
  region?: string;
  code?: string;
  apiKey?: string;
  modelName?: string;
  language?: string;
  info?: string;
};

type ConfigActions = {
  updateConfig: (fields: Partial<ConfigState>) => void;
};

export type ConfigStore = ConfigState & ConfigActions;

export const createConfigSlice: StateCreator<
  ConfigStore,
  [],
  [],
  ConfigStore
> = (set) => ({
  region: env.NEXT_PUBLIC_DEFAULT_REGION,
  language: env.NEXT_PUBLIC_DEFAULT_LOCALE,
  code: "",
  apiKey: "",
  modelName: "",
  info: "",
  updateConfig: (fields) => set(produce((state) => ({ ...state, ...fields }))),
});
