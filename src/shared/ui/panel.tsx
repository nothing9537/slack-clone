import { FC, ReactNode } from "react";
import { TriangleAlert, X } from "lucide-react";
import { Button } from "./button";

interface PanelProps {
  children: ReactNode;
  headerText: string;
  onPanelClose: () => void;
}
export const PanelFallback = () => (
  <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
    <TriangleAlert className="size-5 text-destructive" />
    <p className="text-destructive">
      Something went wrong while loading panel... :(
    </p>
  </div>
);

export const Panel: FC<PanelProps> = ({ children, headerText, onPanelClose }) => {
  return (
    <div className="h-full flex flex-col overflow-y-auto app-scrollbar">
      <div className="flex justify-between items-center min-h-12 h-full max-h-12 px-4 border-b">
        <p className="text-lg font-bold">{headerText}</p>
        <Button size="iconSm" onClick={onPanelClose} variant="ghost">
          <X className="size-5 stroke-[1.5]" />
        </Button>
      </div>
      {children}
    </div>
  );
};
