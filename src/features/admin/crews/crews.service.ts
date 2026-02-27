import { useQuery } from "@tanstack/react-query";
import { getCrewList } from "./crews.api";
import type { AdminCrew } from "./crew.schema";
import type { AxiosError } from "axios";

export const useCrewList = () => {
  return useQuery<AdminCrew[], AxiosError>({
    queryKey: ["AdminCrewList"],
    queryFn: getCrewList,
  });
};