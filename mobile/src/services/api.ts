import axios, { AxiosInstance } from "axios";
import { BASE_URL } from '@env';
import { AppError } from "@utils/AppError";

type SignOut = () => void;

type ApiInstanceProps = AxiosInstance &{
  registerInterceptTokenManager: (signOut: SignOut) => () => void; 
}

const api = axios.create({
  baseURL: BASE_URL,
}) as ApiInstanceProps;

api.registerInterceptTokenManager = signOut => {
  const interceptTokenManager = api.interceptors.response.use(response => response, error => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(error);
    }
  });

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  }
}

export { api}