import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient.ts";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak/Keycloak.ts";
import LogoLoader from "./Components/Utils/LogoLoader.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ReactKeycloakProvider
    initOptions={{ onLoad: "login-required", pkceMethod: "S256" }}
    authClient={keycloak}
    LoadingComponent={<LogoLoader LoadingText="Keycloak connection" />}
  >
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </ReactKeycloakProvider>
  // </StrictMode>
);
