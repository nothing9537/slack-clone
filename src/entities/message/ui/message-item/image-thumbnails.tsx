import { FC } from "react";

import { Thumbnail } from "@/shared/ui/thumbnail";

import { Message } from "../../model/types/message-services.types";

interface ImageThumbnailsProps {
  message: NonNullable<Message>;
}

export const ImageThumbnails: FC<ImageThumbnailsProps> = ({ message }) => {
  if (message.images.length <= 0) {
    return null;
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {message.images.map((imageURL) => (
        <Thumbnail
          src={imageURL}
          key={imageURL}
        />
      ))}
    </div>
  );
};
