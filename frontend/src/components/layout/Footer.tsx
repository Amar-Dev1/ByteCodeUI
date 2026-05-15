import { Link } from "react-router-dom";

const Footer = () => {
  const links = [
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms of Service", path: "/terms" },
    { label: "Contact", path: "/contact" },
    { label: "About Us", path: "/about" },
  ];

  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant w-full py-xl px-gutter flex flex-col md:flex-row justify-between items-center mt-auto">
      <div className="mb-md md:mb-0 text-center md:text-left">
        <span className="font-display text-headline-md text-primary block mb-sm md:mb-0">
          ByteCode
        </span>
        <span className="font-body-md text-body-md text-on-surface-variant md:hidden">
          © {new Date().getFullYear()} ByteCode University Tech Community
        </span>
      </div>
      <div className="flex flex-col md:flex-row gap-lg items-center font-body-md text-body-md">
        <div className="flex gap-md flex-wrap justify-center">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="text-on-surface-variant hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <span className="hidden md:inline text-on-surface-variant text-sm border-l border-outline-variant pl-lg ml-xs">
          © {new Date().getFullYear()} ByteCode University Tech Community
        </span>
      </div>
    </footer>
  );
};

export default Footer;
