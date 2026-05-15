import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LoginPage = () => {
  return (
    <div className="min-h-screen w-full flex bg-surface">
      {/* Left Side — Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-gutter py-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md flex flex-col gap-xl"
        >
          {/* Brand */}
          <div className="flex flex-col gap-sm">
            <Link
              to="/"
              className="font-display text-headline-lg font-bold text-primary mb-md inline-block"
            >
              ByteCode
            </Link>
            <h1 className="font-display text-display text-on-surface">
              Welcome back
            </h1>
            <p className="font-body-lg text-on-surface-variant">
              Sign in to your account to continue where you left off.
            </p>
          </div>

          {/* Auth Buttons */}
          <div className="flex flex-col gap-md">
            <button className="w-full flex items-center justify-center gap-md bg-surface-container-high border border-outline-variant text-on-surface font-body-md px-xl py-md rounded-xl hover:bg-surface-variant hover:border-outline transition-all duration-200 cursor-pointer group">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="group-hover:translate-x-0.5 transition-transform">
                Continue with Google
              </span>
            </button>

            <button className="w-full flex items-center justify-center gap-md bg-surface-container-high border border-outline-variant text-on-surface font-body-md px-xl py-md rounded-xl hover:bg-surface-variant hover:border-outline transition-all duration-200 cursor-pointer group">
              <svg
                className="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="group-hover:translate-x-0.5 transition-transform">
                Continue with GitHub
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-md">
            <div className="flex-1 h-px bg-outline-variant"></div>
            <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">
              New here?
            </span>
            <div className="flex-1 h-px bg-outline-variant"></div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <Link
              to="/signup"
              className="inline-flex items-center gap-sm text-primary hover:text-primary-fixed-dim font-body-md transition-colors group"
            >
              Create an account
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>

          {/* Footer */}
          <p className="text-center font-label-sm text-on-surface-variant text-xs mt-md">
            By continuing, you agree to ByteCode's{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </motion.div>
      </div>

      {/* Right Side — Visual */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-surface-container-lowest">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-primary)/15,_transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--color-secondary)/10,_transparent_60%)]"></div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--color-on-surface) 1px, transparent 1px), linear-gradient(90deg, var(--color-on-surface) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Floating decorative elements */}
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-[15%] left-[20%] w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 backdrop-blur-sm"
        />
        <motion.div
          animate={{ y: [10, -10, 10], rotate: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-[35%] right-[15%] w-16 h-16 rounded-xl bg-secondary/10 border border-secondary/20 backdrop-blur-sm"
        />
        <motion.div
          animate={{ y: [-8, 12, -8] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
          className="absolute bottom-[25%] left-[30%] w-24 h-24 rounded-3xl bg-tertiary/10 border border-tertiary/20 backdrop-blur-sm"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-xl text-center">
          {/* Code block visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-surface-container/80 backdrop-blur-xl border border-outline-variant rounded-2xl p-xl max-w-sm w-full shadow-2xl mb-xl"
          >
            <div className="flex items-center gap-sm mb-md">
              <div className="w-3 h-3 rounded-full bg-error/60"></div>
              <div className="w-3 h-3 rounded-full bg-tertiary/60"></div>
              <div className="w-3 h-3 rounded-full bg-secondary/60"></div>
            </div>
            <div className="text-left font-code-md text-code-md space-y-xs">
              <p>
                <span className="text-secondary">const</span>{" "}
                <span className="text-primary">community</span>{" "}
                <span className="text-on-surface-variant">=</span>{" "}
                <span className="text-tertiary">await</span>{" "}
                <span className="text-primary">join</span>
                <span className="text-on-surface-variant">(</span>
              </p>
              <p className="pl-lg">
                <span className="text-on-surface-variant">"</span>
                <span className="text-secondary">ByteCode</span>
                <span className="text-on-surface-variant">"</span>
              </p>
              <p>
                <span className="text-on-surface-variant">);</span>
              </p>
              <p className="mt-md">
                <span className="text-secondary">console</span>
                <span className="text-on-surface-variant">.</span>
                <span className="text-primary">log</span>
                <span className="text-on-surface-variant">(</span>
                <span className="text-tertiary">community</span>
                <span className="text-on-surface-variant">);</span>
              </p>
              <p className="text-on-surface-variant/50 mt-sm">
                // → Building the future, together 🚀
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col gap-sm"
          >
            <h2 className="font-display text-headline-lg text-on-surface">
              Build. Learn. Grow.
            </h2>
            <p className="font-body-lg text-on-surface-variant max-w-xs mx-auto">
              Join a community of builders, thinkers, and dreamers shaping the
              future of tech.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-xl mt-xl"
          >
            <div className="flex flex-col items-center">
              <span className="font-display text-headline-md text-primary">
                500+
              </span>
              <span className="font-label-sm text-on-surface-variant text-xs uppercase tracking-wider">
                Members
              </span>
            </div>
            <div className="w-px h-8 bg-outline-variant"></div>
            <div className="flex flex-col items-center">
              <span className="font-display text-headline-md text-secondary">
                50+
              </span>
              <span className="font-label-sm text-on-surface-variant text-xs uppercase tracking-wider">
                Events
              </span>
            </div>
            <div className="w-px h-8 bg-outline-variant"></div>
            <div className="flex flex-col items-center">
              <span className="font-display text-headline-md text-tertiary">
                100+
              </span>
              <span className="font-label-sm text-on-surface-variant text-xs uppercase tracking-wider">
                Projects
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
