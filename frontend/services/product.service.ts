import { api } from "./api";

export const ProductService = {
  async getProducts() {
    const response = await api.get(
      "/api/products",
    );

    return response.data;
  },

  async getProduct(id: string) {
    const response = await api.get(
      `/api/products/${id}`,
    );

    return response.data;
  },

  async compareProducts() {
    const response = await api.get(
      "/api/products",
    );

    return response.data;
  },
};