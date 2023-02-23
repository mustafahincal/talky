import { User } from "./user";

export type AuthContextType = {
  currentUser: User | undefined;
  logged: boolean;
  setLogged: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  register: (userForRegister: RegisterRequest) => void;
  login: (userForLogin: LoginRequest) => void;
  logout: () => void;
};

export type RegisterRequest = {
  formData: FormData;
};

export type LoginRequest = {
  email: string;
  password: string;
};
