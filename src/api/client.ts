import axios from "axios";

const BASE_URL = "https://intranet.urgencesante.fr:8090/api";

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export default client;
