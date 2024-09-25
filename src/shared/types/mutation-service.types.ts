export interface MutationServiceOptions<TResponse, TArgs = {}> {
  onSuccess?: (data: TResponse, args?: TArgs) => void;
  onError?: (errorMessage: string) => void;
  onSettled?: () => void;
  throwError?: boolean;
}
