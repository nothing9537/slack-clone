import { FC, ReactNode } from "react";

interface JoinPageLayoutProps {
  children: ReactNode;
}

export const JoinPageLayout: FC<JoinPageLayoutProps> = ({ children }) => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      {children}
    </div>
  );
};
