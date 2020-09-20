export interface AsyncAction {
  params: object | null;
}

export interface UseAsyncActionResponse {
  data: any;
  loading: boolean;
  error: any;
}

export type CallAsyncAction = (params?: any) => Promise<void>;
export type CleanAsyncAction = () => void;

export interface FetchData {
  url?: string;
  uri: string;
  options?: object;
}

export type UseAsyncAction = (
  action: any
) => [UseAsyncActionResponse, CallAsyncAction, CleanAsyncAction];
