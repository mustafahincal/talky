import React, { createContext, useContext, useState } from "react";

import { User, UserContextType } from "../types/user";

export const UserContext = createContext<UserContextType | null>(null);

type props = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  const values: UserContextType = {
    users,
    setUsers,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext) as UserContextType;
