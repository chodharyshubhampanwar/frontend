import { api } from "../lib/axios";
import { User } from "../types/auth";

export const userService = {
  getUser: async (userId: string): Promise<User> => {
    const { data } = await api.get(`/user/${userId}`);
    return data;
  },

  createUser: async (userData: Omit<User, "id">): Promise<User> => {
    const { data } = await api.post("/user", userData);
    return data;
  },

  // Add other user-related API calls here
};
