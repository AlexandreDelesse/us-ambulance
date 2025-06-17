import QueryComponent, {
  type QueryPresenter,
} from "../Components/Utils/QueryComponent";
import { useGetJoblist } from "../Components/Joblist/Joblist.service";
import type { Job } from "../Components/Joblist/Job";
import Joblist from "../Components/Joblist/Joblist";
import ErrorHandler from "../Components/Utils/Error/ErrorHandler";
import LogoLoader from "../Components/Utils/LogoLoader";
import { Navigate, useNavigate } from "react-router";
import DriverContainer from "../Components/Driver/DriverContainer";
import VersionDisplay from "../Components/Utils/VersionDisplay";
import { useCrew } from "../Components/Crew/CrewContext";

export default function MissionsPage() {
  const navigate = useNavigate();
  const { crew } = useCrew();
  const query = useGetJoblist(crew?.CrewId);

  const handleJobClick = (id: string) => navigate(id);

  //TODO: Rajouter le filtre mission terminées

  const presenter: QueryPresenter<Job[]> = {
    presentSuccess: (jobs) => (
      <Joblist onClick={handleJobClick} joblist={jobs} />
    ),
    presentError: (error) => <ErrorHandler error={error} />,
    presentLoading: () => <LogoLoader />,
  };

  if (!crew) return <Navigate to={"/CrewList"} replace />;

  return (
    <>
      <DriverContainer />
      {QueryComponent(query, presenter)}
      <VersionDisplay />
    </>
  );
}
