import { Link } from "react-router-dom";
import { supabase } from "../services/supabase";

const SignUpPage = () => {
  const handleOAuthSignUp = async (provider: 'google' | 'github') => {
    try {
      await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin + '/community'
        }
      });
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-background overflow-hidden selection:bg-secondary/30">
      
      {/* Dynamic Background Effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 w-[90%] lg:w-[50%] p-8 sm:p-12 bg-surface-container/60 backdrop-blur-xl border border-outline-variant/30 rounded-2xl shadow-2xl">
        {/* Brand & Header */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-secondary to-primary text-on-primary mb-6 shadow-lg shadow-secondary/20 hover:scale-105 transition-transform duration-300">
             <span className="material-symbols-outlined text-3xl">rocket_launch</span>
          </Link>
          <h1 className="font-display text-3xl font-bold text-on-surface mb-3 tracking-tight">
            Join ByteCode
          </h1>
          <p className="font-body-md text-on-surface-variant">
            Create an account to unlock the full community experience.
          </p>
        </div>

        {/* OAuth Buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleOAuthSignUp('google')}
            className="group relative w-full flex items-center justify-center gap-3 bg-surface-container-high border border-outline-variant/50 text-on-surface font-medium px-6 py-3.5 rounded-xl hover:bg-surface-variant hover:border-outline hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
            <svg className="w-5 h-5 relative z-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="relative z-10">Sign up with Google</span>
          </button>

          <button
            onClick={() => handleOAuthSignUp('github')}
            className="group relative w-full flex items-center justify-center gap-3 bg-surface-container-high border border-outline-variant/50 text-on-surface font-medium px-6 py-3.5 rounded-xl hover:bg-surface-variant hover:border-outline hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
            <svg className="w-5 h-5 fill-current relative z-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="relative z-10">Sign up with GitHub</span>
          </button>
        </div>

        {/* Footer Link */}
        <div className="mt-8 pt-6 border-t border-outline-variant/30 text-center">
          <p className="text-on-surface-variant mb-2">Already have an account?</p>
          <Link to="/login" className="inline-flex items-center gap-1.5 text-secondary font-medium hover:text-secondary-fixed hover:underline transition-all">
            Sign in instead
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </div>
      
      {/* Footer Details */}
      <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
        <p className="text-xs text-on-surface-variant/60 font-body-sm">
          ByteCode © {new Date().getFullYear()} • Elevating Developers
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
