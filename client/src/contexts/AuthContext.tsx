import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLogin, fetchRegister } from "../services/authService";
import { AuthContextType, LoginRequest, RegisterRequest } from "../types/auth";
import { toast } from "react-toastify";
import Loading from "../components/loading/Loading";

export const AuthContext = createContext<AuthContextType | null>(null);

type props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<props> = ({ children }) => {
  const [logged, setLogged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate: any = useNavigate();

  const register = (userForRegister: RegisterRequest) => {
    fetchRegister(userForRegister)
      .then((response: any) => {
        toast.success("Registration Successful");
        navigate("/");
      })
      .catch((err: any) => {
        toast.success("Failed To Register");
        navigate("/");
      });
  };
  const login = (userForLogin: LoginRequest) => {
    setLoading(true);
    fetchLogin(userForLogin)
      .then((response: any) => {
        console.log(response);
        localStorage.setItem("token", response.token);
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            id: response.id,
            name: response.name,
            email: response.email,
            image: response.image,
          })
        );
        setLogged(true);
        setLoading(false);
        toast.success("Login Successsful");
        navigate("/chat");
      })
      .catch((err: any) => {
        toast.error(err.response.data.message);
        setLoading(false);
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
