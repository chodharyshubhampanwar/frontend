import { createContext, useContext, useReducer, ReactNode } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase";
import { AuthState, AuthAction, AuthContextType } from "../types/auth";
import { useUser } from "../hooks/useUser";

// Initial state
const initialState: AuthState = {
  user: null,
  loading: true,
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { createUser } = useUser(state.user?.uid ?? null);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;

      console.log(user);

      await createUser.mutateAsync({
        uid: user.uid,
        email: user.email!,
        name: user.displayName,
        username: "username",
        createdAt: new Date().toISOString(),
      });

      dispatch({
        type: "SET_USER",
        payload: {
          uid: user.uid,
          email: user.email!,
          name: user.displayName,
          username: user.displayName,
          createdAt: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    state,
    dispatch,
    signInWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
