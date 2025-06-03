import React from "react";
import QueryComponent, {
  type QueryPresenter,
} from "../Components/Utils/QueryComponent";
import { useQuery } from "@tanstack/react-query";
import { getJoblist } from "../Components/Joblist/Joblist.service";
import type { Job } from "../Components/Joblist/Job";
import Joblist from "../Components/Joblist/Joblist";
import ErrorHandler from "../Components/Utils/Error/ErrorHandler";
import LogoLoader from "../Components/Utils/LogoLoader";
import type { AxiosError } from "axios";

export default function MissionsPage() {
  const query = useQuery<Job[], AxiosError>({
    queryKey: ["Missions", 232425],
    queryFn: () => getJoblist(232425),
  });

  const presenter: QueryPresenter<Job[]> = {
    presentSuccess: (jobs) => <Joblist joblist={jobs} />,
    presentError: (error) => <ErrorHandler error={error} />,
    presentLoading: () => <LogoLoader />,
  };

  return QueryComponent(query, presenter);
}
