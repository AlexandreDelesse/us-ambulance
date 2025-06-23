import axios from "axios";
import keycloak from "../Keycloak/Keycloak";

const BASE_URL = "https://intranet.urgencesante.fr:8090/api";
const NOTIFICATION_BASE_URL = "http://85.214.12.96:5254/api/";

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const notificationClient = axios.create({
  baseURL: NOTIFICATION_BASE_URL,
  timeout: 10000,
});

notificationClient.interceptors.request.use(async (config) => {
  if (!keycloak.authenticated) {
    await keycloak.login(); // si besoin
  }

  await keycloak.updateToken(60); // refresh si bientôt expiré

  config.headers.Authorization = `Bearer ${keycloak.token}`;
  return config;
});

export default client;
