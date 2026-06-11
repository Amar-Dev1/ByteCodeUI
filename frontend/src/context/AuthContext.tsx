import { createContext, useContext, useEffect, useState } from "react";
import { type User, type Session } from "@supabase/supabase-js";
import { supabase } from "../services/supabase";
import axios from "axios";

interface BackendUser {
  id: string;
  email: string;
  username: string | null;
  hasSetUsername: boolean;
  profileImg: string | null;
  bio: string | null;
  interests: string;
  links: string;
  role: string;
  name: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  backendUser: BackendUser | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  backendUser: null,
  isLoading: true,
  signOut: async () => {},
  refreshUser: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [backendUser, setBackendUser] = useState<BackendUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session) {
        syncUserWithBackend(session.access_token);
      } else {
        setIsLoading(false);
      }
    });

    // Listen to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session) {
        await syncUserWithBackend(session.access_token);
      } else {
        setBackendUser(null);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const syncUserWithBackend = async (token: string) => {
    try {
      const res = await axios.get("http://localhost:3000/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBackendUser(res.data.user);
    } catch (error) {
      console.error("Failed to sync user with backend:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    if (session?.access_token) {
      await syncUserWithBackend(session.access_token);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, backendUser, isLoading, signOut, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
