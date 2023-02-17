export type AuthContextType = {
  logged: boolean;
  setLogged: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
