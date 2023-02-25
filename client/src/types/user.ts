export type User = {
  _id: string;
  name: string;
  email: string;
  image: string;
};

export type UserContextType = {
  filteredUsers: User[];
  getAllUsers: () => void;
  getFilteredUsers: (search: string) => void;
};
