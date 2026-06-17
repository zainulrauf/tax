import { api } from "./api";

export const RecommendationService = {
  async getRecommendation(
    payload: any,
  ) {
    const response =
      await api.post(
        "/api/recommend",
        payload,
      );

    return response.data;
  },
};