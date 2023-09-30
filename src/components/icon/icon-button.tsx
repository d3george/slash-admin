import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};
export function IconButton({ children, className, onClick }: Props) {
  return (
    <button
      className={`flex cursor-pointer items-center justify-center rounded-full p-2 hover:bg-hover ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
