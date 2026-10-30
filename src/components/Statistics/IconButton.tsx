import { ReactNode } from "react";

interface IconButtonProps {
  label: string;
  onClick: () => void;
  danger?: boolean;
  children: ReactNode;
}

// Shown all the time on touch screens, and on hover or focus on wider ones
const IconButton = ({ label, onClick, danger, children }: IconButtonProps) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    className={`cursor-pointer rounded-md p-2 text-neutral-500 transition md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 ${danger ? "hover:text-red-400" : "hover:text-neutral-100"}`}
  >
    {children}
  </button>
);

export default IconButton;
