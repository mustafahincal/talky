import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLogin, fetchRegister } from "../services/authService";
import { AuthContextType, Register, Login } from "../types/auth";
import { toast } from "react-toastify";

export const AuthContext = createContext<AuthContextType | null>(null);

type props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<props> = ({ children }) => {
  const [logged, setLogged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate: any = useNavigate();

  const register = (userForRegister: Register) => {
    fetchRegister(userForRegister)
      .then((result) => {
        toast.success("Registration Successful");
      })
      .catch((err) => {
        toast.success("Failed To Register");
      });
  };
  const login = (userForLogin: Login) => {
    fetchLogin(userForLogin)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const values: AuthContextType = {
    logged,
    setLogged,
    loading,
    setLoading,
    register,
    login,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext) as AuthContextType;
