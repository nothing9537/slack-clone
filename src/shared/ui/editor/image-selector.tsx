import { FC, memo, MutableRefObject } from "react";
import { ImageIcon } from "lucide-react";

import { Button } from "../button";
import { Hint } from "../hint";

interface ImageSelectorProps {
  disabled: boolean;
  imageElementRef: MutableRefObject<HTMLInputElement | null>;
}

export const ImageSelector: FC<ImageSelectorProps> = memo(({ disabled, imageElementRef }) => {
  return (
    <Hint label="Image">
      <Button disabled={disabled} size="iconSm" variant="ghost" type="button" onClick={() => imageElementRef.current?.click()}>
        <ImageIcon className="size-4" />
      </Button>
    </Hint>
  );
});
