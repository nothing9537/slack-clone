import { Loader } from "lucide-react";

export const EditorLoader = () => (
  <div className="border border-slate-200 rounded-md bg-white flex items-center justify-center h-[120px] mb-8">
    <Loader className="size-5 animate-spin" />
  </div>
);
