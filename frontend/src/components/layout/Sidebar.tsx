import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

interface ISidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: ISidebarProps) => {
  const { backendUser, signOut } = useAuth();

  const mainLinks = [
    { label: "Explore", icon: "explore", path: "/community" },
    { label: "Blogs", icon: "article", path: "/community/blogs" },
    { label: "Events", icon: "calendar_month", path: "/community/events" },
    { label: "News", icon: "news", path: "/community/news" },

    { label: "My Profile", icon: "person", path: "/community/profile" },
    { label: "Settings", icon: "settings", path: "/community/settings" },
  ];

  const displayName = backendUser?.name || backendUser?.username || "User";
  const displayInitials = displayName.substring(0, 2).toUpperCase();

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={`
          fixed top-0 left-0 h-full z-50
          w-64 lg:w-[20vw] bg-surface-container-low border-r border-outline-variant p-md
          flex flex-col shrink-0
          transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:sticky lg:z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Brand */}
        <div className="mb-xl px-sm pt-sm">
          <span className="font-display text-headline-md font-bold text-primary">
            ByteCode
          </span>
        </div>

        {/* User Profile Header */}
        <div className="flex items-center gap-md mb-lg px-sm">
          <div className="relative flex-shrink-0">
            {backendUser?.profileImg ? (
              <img
                src={backendUser.profileImg}
                alt="User profile"
                className="w-12 h-12 rounded-full object-cover border border-outline-variant"
              />
            ) : (
              <div className="w-12 h-12 rounded-full border border-outline-variant bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold text-base">
                  {displayInitials}
                </span>
              </div>
            )}
            {backendUser?.status && (
              <div
                className="absolute -bottom-1 -right-1 bg-surface-container-lowest rounded-full p-0.5 border border-outline-variant flex items-center justify-center"
                title={backendUser.status}
              >
                <span className="text-xs" style={{ lineHeight: 1 }}>{backendUser.status.split(' ')[0]}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-body-md text-body-md font-semibold text-on-surface truncate">
              {displayName}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
              {backendUser?.role || "University Chapter"}
            </span>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 flex flex-col gap-sm">
          {mainLinks.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === "/community"}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-md rounded-lg px-md py-sm transition-all cursor-pointer active:opacity-80
                ${
                  isActive
                    ? "bg-secondary-container text-on-secondary-container"
                    : "text-on-surface-variant hover:bg-surface-variant"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontVariationSettings: `'FILL' ${isActive ? 1 : 0}`,
                    }}
                  >
                    {item.icon}
                  </span>
                  <span
                    className={`font-label-sm text-label-sm uppercase ${
                      isActive ? "font-bold" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer Navigation */}
        <div className="flex flex-col gap-sm pt-md border-t border-outline-variant">
          <button
            onClick={signOut}
            className="flex items-center gap-md text-error hover:bg-surface-variant rounded-lg px-md py-sm transition-all cursor-pointer active:opacity-80 w-full"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              logout
            </span>
            <span className="font-label-sm text-label-sm uppercase">
              Logout
            </span>
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;

