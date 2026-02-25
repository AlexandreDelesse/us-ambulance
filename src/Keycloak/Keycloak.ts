// src/keycloak.ts
import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_HOST || "https://auth.ade-dev.fr/",
  realm: import.meta.env.VITE_KEYCLOAK_REALM || "ustest",
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || "us-ambulance",
});

export default keycloak;
