import type { ReactNode } from "react";
import type { QueryPresenter } from "./QueryComponent";
import type { AxiosError } from "axios";
import ErrorHandler from "./Error/ErrorHandler";
import LogoLoader from "./LogoLoader";

export default function useQueryPresenter<T>(
  success: (data: T) => ReactNode,
  loading?: () => ReactNode
): QueryPresenter<T> {
  return {
    presentError: (error: AxiosError) => <ErrorHandler error={error} />,
    presentLoading: loading ? loading : () => <LogoLoader />,
    presentSuccess: success,
  };
}
