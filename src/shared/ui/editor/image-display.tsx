/* eslint-disable react/destructuring-assignment */
import Image from "next/image";
import { Dispatch, FC, MutableRefObject, SetStateAction, useEffect, useState } from "react";
import { X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import { Hint } from "../hint";

type EditorValue = {
  images?: File[]; // * available only in "create" variant
  body: string; // * JSON of `Delta` from quill
};

interface ImageDisplayProps {
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
  imageElementRef: MutableRefObject<HTMLInputElement | null>;
  form: UseFormReturn<EditorValue>;
}

export const ImageDisplay: FC<ImageDisplayProps> = ({ setImages, imageElementRef, images, form }) => {
  const [objectURLs, setObjectURLs] = useState<string[]>([]);

  useEffect(() => {
    const urls = images.map((file) => URL.createObjectURL(file));
    setObjectURLs(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleRemove = (indexToRemove: number) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    setImages(updatedImages);

    form.setValue("images", updatedImages);

    URL.revokeObjectURL(objectURLs[indexToRemove]);

    if (imageElementRef.current) {
      const input = imageElementRef.current;
      const dataTransfer = new DataTransfer();

      updatedImages.forEach((file) => {
        dataTransfer.items.add(file);
      });

      input.files = dataTransfer.files;
    }
  };

  return (
    <div className="p-2">
      <div className="flex flex-row flex-wrap gap-2">
        {images.map((file, index) => (
          <div
            className="relative size-16 flex items-center justify-center group/image transition"
            key={`${file.name}-${file.lastModified}`}
          >
            <Hint label="Remove image">
              <button
                className="hidden group-hover/image:flex rounded-full bg-black/75 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-[4] border-2 border-white items-center justify-center transition"
                type="button"
                onClick={() => handleRemove(index)}
                aria-label={`Remove ${file.name}`}
              >
                <X className="size-3.5" />
              </button>
            </Hint>
            {objectURLs[index] && (
              <Image
                src={objectURLs[index]}
                alt={`Uploaded ${file.name}-${index + 1}`}
                fill
                className="rounded-xl overflow-hidden border object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
