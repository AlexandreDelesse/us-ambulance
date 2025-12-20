import { useKeycloak } from "@react-keycloak/web";
import React, { createContext, useContext, useMemo } from "react";

// --- Types
export interface User {
  username: string;
  email?: string;
  roles: string[];
  emailVerified?: boolean;
  sub: string;
  name: string;
  isAdmin: boolean;
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
}

// --- Contexte
const UserContext = createContext<UserContextType>({
  user: null,
  isAuthenticated: false,
});

// --- Hook d’accès
export const useUser = () => useContext(UserContext);

// --- Provider
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { keycloak } = useKeycloak();

  const userContextValue: UserContextType = useMemo(() => {
    const isAuthenticated = keycloak.authenticated ?? false;
    const token = keycloak.tokenParsed;

    if (!isAuthenticated || !token) {
      return { user: null, isAuthenticated: false };
    }

    const userRoles = token.realm_access?.roles ?? [];

    const user: User = {
      username: token.preferred_username || "",
      email: token.email,
      roles: userRoles,
      emailVerified: token.email_verified,
      sub: token.sub || "",
      name: token.name || "",
      isAdmin: userRoles.includes("admin"),
    };

    return { user, isAuthenticated: true };
  }, [keycloak.authenticated, keycloak.tokenParsed]);

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};
