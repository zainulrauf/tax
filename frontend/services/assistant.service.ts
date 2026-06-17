import { api } from "./api";

export const askAssistant = async (
  question: string,
) => {
  const response = await api.post(
    "/api/assistant",
    {
      question,
    },
  );

  return response;
};