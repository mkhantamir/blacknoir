import defaultAxios from "axios";

export const axios = defaultAxios.create({
  baseURL: "https://homelander-production.up.railway.app/",
  withCredentials: true,
});
