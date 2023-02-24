export type User = {
  _id: string;
  name: string;
  email: string;
  image: string;
};

export type UserContextType = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};
