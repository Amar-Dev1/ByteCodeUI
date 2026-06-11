import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface ITopNavbarProps {
  onMenuToggle?: () => void;
}

const TopNavbar = ({ onMenuToggle }: ITopNavbarProps) => {
  const { backendUser } = useAuth();

  return (
    <nav className="bg-surface flex justify-between items-center h-16 px-gutter w-full sticky top-0 z-50 lg:hidden">
      <div className="flex items-center gap-md">
        <NavLink
          to="/"
          className="font-display text-headline-md font-bold text-primary"
        >
          ByteCode
        </NavLink>
        <div className="hidden md:flex ml-lg gap-md font-body-md text-body-md"></div>
      </div>
      <div className="flex items-center gap-md">
        {!backendUser && (
          <>
            <button className="hidden md:block font-body-md text-body-md text-primary hover:bg-surface-container-low px-md py-sm rounded-lg transition-colors">
              Log In
            </button>
            <button className="hidden md:block font-body-md text-body-md bg-primary text-on-primary px-md py-sm rounded-lg hover:bg-primary-fixed transition-colors">
              Sign Up
            </button>
          </>
        )}
        {/* Mobile Hamburger Handle - Used when Sidebar overlay exists on mobile */}
        {onMenuToggle && (
          <button
            onClick={onMenuToggle}
            className="md:hidden p-sm text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default TopNavbar;

