import { Loader } from "lucide-react";

export const MessagesInfiniteLoader = () => {
  return (
    <div className="text-center my-2 relative">
      <hr className="absolute top-1/2 left-0 right-0 border-t border-gray-300" />
      <span className="relative inline-block bg-white px-4 py-1 rounded-full text-xs border border-gray-300 shadow-sm">
        <Loader className="size-4 animate-spin" />
      </span>
    </div>
  );
};
