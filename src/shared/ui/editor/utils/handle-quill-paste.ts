import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { EditorValue } from "../editor";

export const handleQuillPaste = (setImages: Dispatch<SetStateAction<File[]>>, form: UseFormReturn<EditorValue>) => (e: ClipboardEvent) => {
  if (!e.clipboardData) {
    return;
  }

  const { items } = e.clipboardData;

  if (!items) {
    return;
  }

  const imageFiles: File[] = [];

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

  if (imageFiles.length > 0) {
    setImages((prevImages) => {
      const newImages = [...prevImages, ...imageFiles];

      if (newImages.length > 5) {
        form.setValue("images", prevImages);

        return prevImages;
      }

      form.setValue("images", newImages);

      return newImages;
    });

    e.preventDefault();
  }
};
