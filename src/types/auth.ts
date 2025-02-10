export interface User {
  uid: string;
  email: string;
  name: string | null;
  username: string | null;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
}

export interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
  signInWithGoogle: () => Promise<void>;
}

export type AuthAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_LOADING"; payload: boolean };
