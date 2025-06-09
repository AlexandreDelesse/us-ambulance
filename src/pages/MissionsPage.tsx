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
import { useNavigate } from "react-router";
import DriverContainer from "../Components/Driver/DriverContainer";

export default function MissionsPage() {
  const navigate = useNavigate();
  const query = useQuery<Job[], AxiosError>({
    queryKey: ["Missions", 233149],
    queryFn: () => getJoblist(233149),
  });

  const handleJobClick = (id: string) => navigate(id);

  //TODO: Rajouter le filtre mission terminées

  const presenter: QueryPresenter<Job[]> = {
    presentSuccess: (jobs) => (
      <Joblist onClick={handleJobClick} joblist={jobs} />
    ),
    presentError: (error) => <ErrorHandler error={error} />,
    presentLoading: () => <LogoLoader />,
  };

  return (
    <>
      <DriverContainer />
      {QueryComponent(query, presenter)}
    </>
  );
}
