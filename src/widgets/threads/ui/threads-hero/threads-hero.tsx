import { FC } from "react";

export const ThreadsHero: FC = () => {
  return (
    <div className="mx-5 mb-auto">
      <p className="text-2xl font-bold mb-2">
        Threads from all channels in this workspace.
      </p>
      <p className="font-normal text-slate-800 mb-4">
        If you see this block, you have reached the beginning of all threads in this workspace.
        {" "}
        This is very beginning of the
        {" "}
        <strong>Threads.</strong>
      </p>
    </div>
  );
};
