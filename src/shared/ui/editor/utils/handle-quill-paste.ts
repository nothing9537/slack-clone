import { Dispatch, SetStateAction } from "react";

export const handleQuillPaste = (setImages: Dispatch<SetStateAction<File[]>>) => (e: ClipboardEvent) => {
  if (e.clipboardData) {
    const { items } = e.clipboardData;
    const imageFiles: File[] = [];

    if (items) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf("image") !== -1) {
          const file = item.getAsFile();
          if (file) {
            imageFiles.push(file);
          }
        }
      }
    }

    if (imageFiles.length > 0) {
      setImages((prevImages) => {
        const newImages = [...prevImages, ...imageFiles];

        if (newImages.length > 5) {
          return prevImages;
        }

        return newImages;
      });

      e.preventDefault();
    }
  }
};
