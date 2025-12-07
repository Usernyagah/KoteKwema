import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";

interface MenuSubLinkProps {
  href: string;
  onClick: () => void;
  children: ReactNode;
  delay?: number;
  disabled?: boolean;
}

export const MenuSubLink = ({ href, onClick, children, delay = 0, disabled = false }: MenuSubLinkProps) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    onClick();
    navigate(href);
  };

  return (
    <Link
      to={href}
      onClick={handleClick}
      className={`group flex items-center gap-2 text-xs md:text-sm font-light transition-colors duration-200 ${
        disabled 
          ? "text-[#4A4A4A]/50 cursor-not-allowed" 
          : "text-black hover:text-[#4A4A4A] cursor-pointer"
      }`}
      style={{
        animation: `fade-in 0.5s ease-out ${delay}ms both`,
      }}
    >
      <ArrowUpRight className={`h-4 w-4 transition-opacity duration-200 ${
        disabled ? "text-[#4A4A4A]/50" : "text-[#4A4A4A] opacity-100 group-hover:opacity-100"
      }`} />
      <span>{children}</span>
    </Link>
  );
};

