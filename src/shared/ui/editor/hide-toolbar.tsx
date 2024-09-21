import { FC, memo } from "react";

import { PiTextAa } from "react-icons/pi";
import { Button } from "../button";
import { Hint } from "../hint";

interface HideToolbarProps {
  toggleToolbar: () => void;
  isToolbarVisible: boolean;
  disabled: boolean;
}

export const HideToolbar: FC<HideToolbarProps> = memo(({ toggleToolbar, isToolbarVisible, disabled }) => {
  return (
    <Hint label={isToolbarVisible ? "Show formatting" : "Hide formatting"}>
      <Button disabled={disabled} size="iconSm" variant="ghost" type="button" onClick={toggleToolbar}>
        <PiTextAa className="size-4" />
      </Button>
    </Hint>
  );
});
