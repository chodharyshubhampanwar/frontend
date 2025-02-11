// import { api } from "../lib/axios";
// import { User } from "../types/auth";

// export const userService = {
//   getUser: async (userId: string): Promise<User> => {
//     const { data } = await api.get(`/user/${userId}`);
//     return data;
//   },

//   createUser: async (userData: Omit<User, "id">): Promise<User> => {
//     const { data } = await api.post("/user", userData);
//     return data;
//   },

//   // Add other user-related API calls here
// };

// src/services/userService.ts
import { User } from "../types/auth";

export const userService = {
  getUser: async (uid: string): Promise<User> => {
    // Replace with your actual API call.
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          uid,
          email: "user@example.com",
          name: "John Doe",
          username: "johndoe",
          createdAt: new Date().toISOString(),
        });
      }, 500);
    });
  },

  createUser: async (userData: User): Promise<User> => {
    // Replace with your actual API call.
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(userData);
      }, 500);
    });
  },
};

