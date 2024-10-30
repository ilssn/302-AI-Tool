import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ConfigStore, createConfigSlice } from "./slices/config-slice";

// 会话数据, 临时数据不需要缓存
type AppSession = ConfigStore;
export const useAppSession = create<AppSession>()((...a) => ({
  ...createConfigSlice(...a),
}));

// 缓存数据，使用 persist 中间件来持久化
type AppCache = ConfigStore;
export const useAppCache = create<AppCache>()(
  persist(
    (...a) => ({
      ...createConfigSlice(...a),
    }),
    {
      name: "app-store",
    }
  )
);
