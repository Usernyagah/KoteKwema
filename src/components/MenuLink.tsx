import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface MenuLinkProps {
  href: string;
  onClick: () => void;
  children: ReactNode;
  delay?: number;
}

export const MenuLink = ({ href, onClick, children, delay = 0 }: MenuLinkProps) => {
  return (
    <Link
      to={href}
      onClick={onClick}
      className="block group"
      style={{
        animation: `fade-up 0.6s ease-out ${delay}ms both`,
      }}
    >
      <span className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight tracking-tight text-black group-hover:text-[#4A4A4A] transition-colors duration-300 leading-[1.1]">
        {children}
      </span>
    </Link>
  );
};

