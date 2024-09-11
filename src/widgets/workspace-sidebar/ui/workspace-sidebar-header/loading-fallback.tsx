import { FC, ReactNode } from "react";

export const LoadingFallback: FC<{ children: ReactNode; }> = ({ children }) => {
  return (
    <div className="flex flex-col bg-[#532c5f] h-full items-center justify-center">
      {children}
    </div>
  );
};
