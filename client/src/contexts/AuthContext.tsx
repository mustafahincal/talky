import React, { createContext, useContext, useState } from "react";
import { AuthContextType } from "../types/auth";

export const AuthContext = createContext<AuthContextType | null>(null);

type props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<props> = ({ children }) => {
  const [logged, setLogged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const values: AuthContextType = {
    logged,
    setLogged,
    loading,
    setLoading,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext) as AuthContextType;
