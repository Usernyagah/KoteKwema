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
  return (
    <Link
      to={href}
      onClick={onClick}
      className="group flex items-center gap-3 text-base md:text-lg font-light text-black hover:text-[#4A4A4A] transition-colors duration-200"
      style={{
        animation: `fade-in 0.5s ease-out ${delay}ms both`,
      }}
    >
      <span>{children}</span>
      <ArrowUpRight className="h-4 w-4 text-[#4A4A4A] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </Link>
  );
};

