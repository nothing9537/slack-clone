import { useEffect, useState } from "react";

import { convertURLsIntoFiles } from "@/shared/lib/utils/convert-urls-into-files.utils";

import { Message } from "../../model/types/message-services.types";

export const useParseUrlImages = (item: Message, isEditing: boolean): [File[], boolean] => {
  const [files, setFiles] = useState<File[]>([]);
  const [isImagesParsingPending, setIsImagesParsingPending] = useState(false);

  useEffect(() => {
    if (item.images.length <= 0 || !isEditing) {
      return;
    }

    setIsImagesParsingPending(true);

    convertURLsIntoFiles(item.images)
      .then((files) => {
        setFiles(files);
      })
      .finally(() => {
        setIsImagesParsingPending(false);
      });
  }, [item.images, isEditing]);

  return [files, isImagesParsingPending];
};
