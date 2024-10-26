import { useAppSession } from "@/stores";

export const useIsAuthed = () => {
  const apiKey = useAppSession((state) => state.apiKey);
  const isAuthed = !!apiKey;
  return isAuthed;
};
