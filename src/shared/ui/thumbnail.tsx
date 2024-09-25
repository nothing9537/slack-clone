/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./dialog";

interface ThumbnailProps {
  src: string | null | undefined;
}

export const Thumbnail: FC<ThumbnailProps> = ({ src }) => {
  if (!src) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div className="relative overflow-hidden max-w-96 border rounded-lg my-2 cursor-zoom-in">
          <img
            src={src}
            alt="Message"
            className="rounded-md object-contain size-36"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-3xl flex items-center justify-center p-8">
        <DialogTitle>
          <img
            src={src}
            alt="Message"
            className="rounded-md object-cover"
          />
        </DialogTitle>
      </DialogContent>
    </Dialog>
  );
};
