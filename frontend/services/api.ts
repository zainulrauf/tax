import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://tax-backend-ff5k.vercel.app",
});
