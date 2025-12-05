import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";

interface MenuSubLinkProps {
  href: string;
  onClick: () => void;
  children: ReactNode;
  delay?: number;
}

export const MenuSubLink = ({ href, onClick, children, delay = 0 }: MenuSubLinkProps) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <Link
      to={href}
      onClick={handleClick}
      className="group flex items-center gap-2 text-xs md:text-sm font-light text-black hover:text-[#4A4A4A] transition-colors duration-200 cursor-pointer"
      style={{
        animation: `fade-in 0.5s ease-out ${delay}ms both`,
      }}
    >
      <ArrowUpRight className="h-4 w-4 text-[#4A4A4A] opacity-100 group-hover:opacity-100 transition-opacity duration-200" />
      <span>{children}</span>
    </Link>
  );
};

