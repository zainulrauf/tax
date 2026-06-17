import { api } from "./api";

export const AdminService = {
  async getProducts() {
    const response = await api.get(
      "/api/admin/products",
    );

    return response.data;
  },

  async validateConfig() {
    const response = await api.get(
      "/api/admin/validate",
    );

    return response.data;
  },

  async exportProducts() {
    const response = await api.get(
      "/api/admin/export",
    );

    return response.data;
  },
};