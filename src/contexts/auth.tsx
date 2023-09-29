// Dependencies
import React, { ReactNode, useContext } from "react";
import { useStorageState } from "./useStorageState";

// Tipagem explícita para a sessão
interface SessionData {
  userId: string;
  token: string;
  // Adicione outros campos conforme necessário
}

// Types and Interfaces
type AuthContextType = {
  signIn: (sessionData: SessionData) => void;
  signOut: () => void;
  session?: SessionData | null;
  isLoading: boolean;
};

interface SessionProviderProps {
  children: ReactNode;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

export function useSession(): AuthContextType {
  const value = useContext(AuthContext);

  if (process.env.NODE_ENV !== "production" && !value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value as AuthContextType;
}

export function SessionProvider({
  children,
}: SessionProviderProps): JSX.Element {
  const [[isLoading, session], setSession] = useStorageState("session");

  const safeSetSession = (data: SessionData) => {
    try {
      setSession(JSON.stringify(data));
    } catch (e) {
      console.error("Error serializing session data:", e);
    }
  };

  const parsedSession = (): SessionData | null => {
    try {
      return session ? JSON.parse(session) : null;
    } catch (e) {
      console.error("Error parsing session data:", e);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn: (sessionData: SessionData) => {
          safeSetSession(sessionData);
        },
        signOut: () => {
          setSession(null);
        },
        session: parsedSession(),
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
