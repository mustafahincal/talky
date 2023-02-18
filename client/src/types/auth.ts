export type AuthContextType = {
  logged: boolean;
  setLogged: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  register: (userForRegister: Register) => void;
  login: (userForLogin: Login) => void;
};

export type Register = {
  name: string;
  email: string;
  password: string;
};

export type Login = {
  email: string;
  password: string;
};
