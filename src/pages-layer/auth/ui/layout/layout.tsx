import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-full flex bg-[#5c3b58] dark:bg-zinc-900 app-scrollbar overflow-y-auto">
      {children}
    </div>
  );
};
