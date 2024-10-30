import { env } from "@/env";
import { useAppSession } from "@/stores";

export const useIsAuthed = () => {
  const apiKey = useAppSession((state) => state.apiKey);
  const isAuthed = apiKey || env.NEXT_PUBLIC_302_API_KEY;
  return !!isAuthed;
};
