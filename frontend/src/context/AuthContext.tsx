import { createContext, useContext, useEffect, useRef, useState } from "react";
import { type User, type Session } from "@supabase/supabase-js";
import { supabase } from "../services/supabase";
import axios from "axios";

export interface IBackendUser {
  id: string;
  email: string;
  username: string | null;
  hasSetUsername: boolean;
  profileImg: string | null;
  bio: string | null;
  interests: string;
  links: string;
  status: string | null;
  role: string;
  name: string | null;
}

interface IAuthContextType {
  user: User | null;
  session: Session | null;
  backendUser: IBackendUser | null;
  isLoading: boolean;
  backendError: string | null;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<IAuthContextType>({
  user: null,
  session: null,
  backendUser: null,
  isLoading: true,
  backendError: null,
  signOut: async () => {},
  refreshUser: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [backendUser, setBackendUser] = useState<IBackendUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [backendError, setBackendError] = useState<string | null>(null);

  // Prevent concurrent sync calls
  const isSyncing = useRef(false);

  useEffect(() => {
    // Initial session load — runs once on mount
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setUser(initialSession?.user ?? null);

      if (initialSession) {
        syncUserWithBackend(initialSession);
      } else {
        // Not logged in — stop loading immediately
        setIsLoading(false);
      }
    }).catch(() => {
      // Supabase itself failed — just stop loading
      setIsLoading(false);
    });

    // Listen for login / logout / token refresh events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);

        if (newSession) {
          await syncUserWithBackend(newSession);
        } else {
          setBackendUser(null);
          setBackendError(null);
          setIsLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Calls the backend to create/fetch the local user record.
   * Uses the session passed in directly — no nested getSession() call
   * (which could cause infinite loops).
   * Has a 5-second timeout so the spinner never gets stuck.
   */
  const syncUserWithBackend = async (activeSession: Session) => {
    // Don't run two syncs at the same time
    if (isSyncing.current) return;
    isSyncing.current = true;

    try {
      setBackendError(null);

      const res = await axios.get("http://localhost:3000/auth/me", {
        headers: {
          Authorization: `Bearer ${activeSession.access_token}`,
        },
        timeout: 5000, // fail fast if backend is unreachable
      });

      const userData = res.data.user as IBackendUser;

      // Enrich with Supabase metadata when backend fields are empty
      const meta = activeSession.user?.user_metadata ?? {};
      if (!userData.name && (meta.full_name || meta.name)) {
        userData.name = meta.full_name || meta.name;
      }
      if (!userData.profileImg) {
        userData.profileImg = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
      }

      setBackendUser(userData);
    } catch (error: any) {
      console.error("Failed to sync user with backend:", error);
      setBackendError(
        error?.response?.data?.message ||
          (error?.code === "ECONNABORTED"
            ? "Backend timed out. Please ensure the server is running."
            : "Could not connect to server. Please try again.")
      );
    } finally {
      setIsLoading(false);
      isSyncing.current = false;
    }
  };

  const refreshUser = async () => {
    if (session) {
      await syncUserWithBackend(session);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{ user, session, backendUser, isLoading, backendError, signOut, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
