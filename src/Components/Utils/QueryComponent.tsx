import type { UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { type ReactNode } from "react";

export interface QueryPresenter<T> {
  presentSuccess: (data: T) => ReactNode;
  presentError: (error: AxiosError) => ReactNode;
  presentLoading: () => ReactNode;
}

export default function QueryComponent<T>(
  query: UseQueryResult<T, AxiosError>,
  presenter: QueryPresenter<T>
) {
  if (query.isLoading) return presenter.presentLoading();
  if (query.isError) return presenter.presentError(query.error);

  if (!query.data) return <>Something went wrong</>;
  return presenter.presentSuccess(query.data);
}
