import { ReactNode } from "react";

interface MenuSectionProps {
  title: string;
  children: ReactNode;
}

export const MenuSection = ({ title, children }: MenuSectionProps) => {
  return (
    <div>
      <h3 className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#4A4A4A] font-light mb-0">
        {title}
      </h3>
      {children}
    </div>
  );
};

