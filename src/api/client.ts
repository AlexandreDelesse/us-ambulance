import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import keycloak from "../Keycloak/Keycloak";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api`;
const REGUL_API_URL = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_REGUL_API_PORT}`;
const NOTIFICATION_API_URL = import.meta.env.VITE_NOTIFICATION_API_URL;
const ADMIN_API_URL = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_ADMIN_API_PORT}/api`;

const addAuthToken = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  if (!keycloak.authenticated) {
    await keycloak.login();
  }
  await keycloak.updateToken(60);
  config.headers.Authorization = `Bearer ${keycloak.token}`;
  return config;
};

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const notificationClient = axios.create({
  baseURL: NOTIFICATION_API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export const regulApi = axios.create({
  baseURL: REGUL_API_URL,
  timeout: 3000,
  headers: { "Content-Type": "application/json" },
});

export const adminClient = axios.create({
  baseURL: ADMIN_API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

client.interceptors.request.use(addAuthToken);
notificationClient.interceptors.request.use(addAuthToken);
regulApi.interceptors.request.use(addAuthToken);
adminClient.interceptors.request.use(addAuthToken);

export default client;