import { UseQueryStateReturn } from "nuqs";
import { useCallback } from "react";

export const usePanel = <TParam>(useQueryParam: () => UseQueryStateReturn<TParam | null, undefined>) => {
  const [queryParam, setQueryParam] = useQueryParam();

  const onPanelOpen = useCallback((v: TParam) => {
    setQueryParam(v);
  }, [setQueryParam]);

  const onPanelClose = useCallback(() => {
    setQueryParam(null);
  }, [setQueryParam]);

  return {
    queryParam,
    onPanelOpen,
    onPanelClose,
  };
};
