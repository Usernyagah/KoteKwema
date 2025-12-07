import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface MenuLinkProps {
  href: string;
  onClick?: (e: React.MouseEvent) => void;
  onMouseEnter?: () => void;
  isActive?: boolean;
  children: ReactNode;
  delay?: number;
}

export const MenuLink = ({ href, onClick, onMouseEnter, isActive = false, children, delay = 0 }: MenuLinkProps) => {
  return (
    <Link
      to={href}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className="block group"
      style={{
        animation: `fade-up 0.6s ease-out ${delay}ms both`,
      }}
    >
      <span className={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extralight tracking-tight transition-colors duration-300 leading-[1.1] cursor-pointer ${
        isActive 
          ? "text-black font-normal" 
          : "text-[#4A4A4A] group-hover:text-black"
      }`}>
        {children}
      </span>
    </Link>
  );
};

