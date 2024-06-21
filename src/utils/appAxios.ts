import axios from "axios";

export const appAxios = axios.create({
    baseURL: 'BASE_URL',
  });