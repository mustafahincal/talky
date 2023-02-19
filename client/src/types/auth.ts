import { User } from "./user";

export type AuthContextType = {
  currentUser: User | undefined;
  logged: boolean;
  setLogged: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  register: (userForRegister: RegisterRequest) => void;
  login: (userForLogin: LoginRequest) => void;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};
