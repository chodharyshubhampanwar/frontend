import { api } from "../lib/axios";
import { User } from "../types/auth";

class UserService {
  private static instance: UserService;
  private cache: Map<string, Promise<User>>;

  private constructor() {
    this.cache = new Map();
  }

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async getUser(userId: string): Promise<User> {
    // Check cache first
    const cachedPromise = this.cache.get(userId);
    if (cachedPromise) {
      return cachedPromise;
    }

    const promise = api.get<User>(`/user/${userId}`)
      .then(response => response.data)
      .finally(() => {
        // Clear cache after request completes
        this.cache.delete(userId);
      });

    // Store promise in cache
    this.cache.set(userId, promise);
    return promise;
  }

  async createUser(userData: Omit<User, "id">): Promise<User> {
    const response = await api.post<User>("/user", userData);
    return response.data;
  }

  async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    const response = await api.patch<User>(`/user/${userId}`, userData);
    return response.data;
  }
}

export const userService = UserService.getInstance();
