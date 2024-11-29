import { STORAGE_TOKEN } from "@/constants/storageToken";
import Cookies from "js-cookie";

export const tokenMethod = {
  get: () =>
    Cookies.get(STORAGE_TOKEN) ? JSON.parse(Cookies.get(STORAGE_TOKEN)) : null,
  set: (token) => Cookies.set(STORAGE_TOKEN, JSON.stringify(token)),
  remove: () => Cookies.remove(STORAGE_TOKEN),
};
