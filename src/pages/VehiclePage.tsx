import { useQuery } from "@tanstack/react-query";
import type { DisplayMecanicLog } from "../Components/MecanicLog/MecanicLog";
import MecanicLogList from "../Components/MecanicLog/MecanicLogList";
import QueryComponent from "../Components/Utils/QueryComponent";
import useQueryPresenter from "../Components/Utils/useQueryPresenter";
import { getMecanicLogs } from "../Components/MecanicLog/MecanicLog.service";
import type { AxiosError } from "axios";

export default function VehiclePage() {
  const presenter = useQueryPresenter<DisplayMecanicLog[]>(
    (data: DisplayMecanicLog[]) => <MecanicLogList mecanicLogList={data} />
  );

  const query = useQuery<DisplayMecanicLog[], AxiosError>({
    queryKey: ["MesanicLogs", 233167],
    queryFn: () => getMecanicLogs(233167),
  });
  return QueryComponent<DisplayMecanicLog[]>(query, presenter);
}
