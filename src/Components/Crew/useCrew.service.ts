import { useQuery } from "@tanstack/react-query";
import { getCrewList } from "./Crew.api";

import { AxiosError } from "axios";
import type { Crew } from "./Crew.model";

export default function useGetCrewList(filter: string) {
  const query = useQuery<Crew[], AxiosError>({
    queryKey: ["Login"],
    queryFn: getCrewList,
  });

  const applyFilter = (list?: Crew[], filter?: string) => {
    if (!list) return [];
    if (!filter) return list;
    return list.filter(
      (crew) =>
        crew.Employee1.toLowerCase().includes(filter.toLowerCase()) ||
        crew.Employee2.toLowerCase().includes(filter.toLowerCase()) ||
        crew.Label.toLowerCase().includes(filter.toLowerCase()) ||
        crew.Immat.toLowerCase().includes(filter.toLowerCase())
    );
  };

  query.data = applyFilter(query.data, filter);

  return query;
}
