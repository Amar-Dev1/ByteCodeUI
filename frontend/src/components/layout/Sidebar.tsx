import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { mockUser } from "../../data/mockData";

interface ISidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: ISidebarProps) => {
  const mainLinks = [
    { label: "Explore", icon: "explore", path: "/community" },
    { label: "Blogs", icon: "article", path: "/community/blogs" },
    { label: "Events", icon: "calendar_month", path: "/community/events" },
    { label: "News", icon: "news", path: "/community/news" },

    { label: "My Profile", icon: "person", path: "/community/profile" },
    { label: "Settings", icon: "settings", path: "/community/settings" },
  ];

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
          <img
            src={
              mockUser.avatar ||
              "https://lh3.googleusercontent.com/aida-public/AB6AXuD2m4g-OVpHkAaLvebn1hNjBx9qCGNslCKFMnwwmioWVe4UfNLWCNjOSebj3WhSwTQT6z9qOYFzjkuh2jr4RmwN9rLeIxEVI-8o0fZBRXLeZG-oe4xM5cun02SHEwI65w5oetNnK6Kh646HemoRKapA2hmNKus8f2V2GllK86DUdCYqSc0D0xEPGidNYWZdZCoxImgeZvFA6OkS1fVxNC6HHx-_0jxi7lAGyOvGkYpXYbN9XDEEue6LeoEdrPic98YzVO17R5LmzWU"
            }
            alt="User profile"
            className="w-12 h-12 rounded-full object-cover border border-outline-variant"
          />
          <div className="flex flex-col">
            <span className="font-body-md text-body-md font-semibold text-on-surface">
              {mockUser.name}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              University Chapter
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

        {/* <div className="mt-auto"></div> */}

        {/* Footer Navigation */}
        <div className="flex flex-col gap-sm pt-md border-t border-outline-variant">
          <NavLink
            to="/community/help"
            onClick={onClose}
            className="flex items-center gap-md text-on-surface-variant hover:bg-surface-variant rounded-lg px-md py-sm transition-all cursor-pointer active:opacity-80"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              help
            </span>
            <span className="font-label-sm text-label-sm uppercase">Help</span>
          </NavLink>
          <button className="flex items-center gap-md text-error hover:bg-surface-variant rounded-lg px-md py-sm transition-all cursor-pointer active:opacity-80 w-full">
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
