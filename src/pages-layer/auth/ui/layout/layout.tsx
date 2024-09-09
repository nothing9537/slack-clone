import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="h-full flex items-center justify-center bg-[#5c3b58] dark:bg-zinc-900">
      {children}
    </div>
  );
};
