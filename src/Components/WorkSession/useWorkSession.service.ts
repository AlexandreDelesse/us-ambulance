import { useMutation, useQuery } from "@tanstack/react-query";
import { ackWorkSession, getWorkSession } from "./WorkSession.api";
import { queryClient } from "../../queryClient";
import useNotifSnack from "../Utils/useNotifSnack";
import { useUser } from "../User/UserContext";
import type { WorkSession, WorkSessionPutCmd } from "./WorkSession.model";
import type { AxiosError } from "axios";

export default function useWorkSession() {
  const { notifySuccess } = useNotifSnack();
  const { user } = useUser();

  const query = useQuery<WorkSession, AxiosError>({
    queryKey: ["worksession", user?.sub],
    queryFn: () => getWorkSession(user?.sub ?? ""),
  });

  //TODO: A finir
  const mutation = useMutation({
    mutationKey: ["worksession"],
    mutationFn: (ws: { id: number; ws: WorkSessionPutCmd }) =>
      ackWorkSession(ws.id, ws.ws),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["worksession"] });
      notifySuccess("Ok");
    },
  });

  return { query, mutation };
}
