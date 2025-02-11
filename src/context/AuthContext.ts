// import { createContext, useContext, useReducer, ReactNode } from "react";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth } from "../config/firebase";
// import { AuthState, AuthAction, AuthContextType } from "../types/auth";
// import { useUser } from "../hooks/useUser";

// // Initial state
// const initialState: AuthState = {
//   user: null,
//   loading: true,
// };

// // Create context
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Reducer
// const authReducer = (state: AuthState, action: AuthAction): AuthState => {
//   switch (action.type) {
//     case "SET_USER":
//       return {
//         ...state,
//         user: action.payload,
//       };
//     case "SET_LOADING":
//       return {
//         ...state,
//         loading: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// // Provider component
// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);
//   const { createUser } = useUser(state.user?.uid ?? null);

//   const signInWithGoogle = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const { user } = result;

//       console.log(user);

//       await createUser.mutateAsync({
//         uid: user.uid,
//         email: user.email!,
//         name: user.displayName,
//         username: "username",
//         createdAt: new Date().toISOString(),
//       });

//       dispatch({
//         type: "SET_USER",
//         payload: {
//           uid: user.uid,
//           email: user.email!,
//           name: user.displayName,
//           username: user.displayName,
//           createdAt: new Date().toISOString(),
//         },
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const value = {
//     state,
//     dispatch,
//     signInWithGoogle,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// stores/authStore.ts

// src/stores/authStore.ts
import {create} from "zustand";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase";
import { userService } from "../services/userService";
import { queryClient } from "../lib/queryClient";
import { User } from "../types/auth";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  // State updaters
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  // Actions
  signInWithGoogle: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  signInWithGoogle: async () => {
    set({ loading: true, error: null });
    const provider = new GoogleAuthProvider();
    try {
      // Sign in with Firebase popup
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      // Prepare a user object using the Firebase user data.
      const newUser: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || "",
        name: firebaseUser.displayName,
        username: firebaseUser.displayName || "username",
        createdAt: new Date().toISOString(),
      };

      // Call the user service to create the user in your backend.
      const createdUser = await userService.createUser(newUser);

      // Update React Query cache with the new user data.
      queryClient.setQueryData(["user", createdUser.uid], createdUser);

      // Update local auth state.
      set({ user: createdUser });
    } catch (error: any) {
      console.error("Error during Google sign in", error);
      set({ error: error.message || "Sign in failed" });
      // Rethrow to allow components (or toast promises) to catch it.
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));
