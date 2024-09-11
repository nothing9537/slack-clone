import { MouseEvent, useCallback, useState } from "react";

export const useToggle = <T extends HTMLElement = HTMLElement>(
  initialState = false,
  cb?: (e: MouseEvent<T>) => void,
): [boolean, (e: MouseEvent<T>) => void] => {
  const [state, setState] = useState(initialState);
  const toggle = useCallback((e: MouseEvent<T>) => {
    setState((state) => !state);
    cb?.(e);
  }, [cb]);

  return [state, toggle];
};
