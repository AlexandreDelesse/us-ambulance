import { useKeycloak } from "@react-keycloak/web";
import { createContext, useContext, useMemo } from "react";

interface User {
  username: string;
  mail?: string;
  roles?: string[];
  emailVerified?: boolean;
  sub: string;
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  isAuthenticated: false,
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { keycloak } = useKeycloak();

  const value = useMemo(() => {
    if (keycloak.authenticated && keycloak.tokenParsed) {
      return {
        user: {
          username: keycloak.tokenParsed.preferred_username || "",
          email: keycloak.tokenParsed.email,
          roles: keycloak.tokenParsed.realm_access?.roles || [],
          emailVerified: keycloak.tokenParsed.email_verified,
          sub: keycloak.tokenParsed.sub || "",
        },
        isAuthenticated: true,
      };
    }
    return {
      user: null,
      isAuthenticated: false,
    };
  }, [keycloak]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
