import { useQuery } from "@tanstack/react-query";

import { login } from "@/services/auth";
import { useAppSession } from "@/stores";

interface InfoResult {
  success: boolean;
  errorMessage?: string;
  data?: {
    code: string;
    info: string;
    apiKey: string;
    modelName: string;
    region: string;
  };
}

export const fetchInfo = async (): Promise<InfoResult> => {
  const { code } = useAppSession.getState();
  const res = await login(code);
  return res;
};

export const useInfo = () => {
  return useQuery<InfoResult, Error>({
    queryKey: ["info"],
    queryFn: async () => {
      return fetchInfo();
    },
    retry: false,
  });
};
