import { useMutation, useQuery } from "@tanstack/react-query";
import { ackWorkSession, getWorkSession } from "./WorkSession.api";
import { queryClient } from "../../queryClient";
import useNotifSnack from "../Utils/useNotifSnack";
import { useUser } from "../User/UserContext";

export default function useWorkSession() {
  const { notifySuccess } = useNotifSnack();
  const { user } = useUser();

  const query = useQuery({
    queryKey: ["worksession"],
    queryFn: () => getWorkSession(user?.sub ?? ""),
  });

  const mutation = useMutation({
    mutationKey: ["worksession"],
    mutationFn: (id: string) => ackWorkSession(id),
    onSuccess: (data) => {
      // queryClient.invalidateQueries({ queryKey: ["worksession"] });
      console.log(data);
      queryClient.setQueryData(["worksession"], data);
      notifySuccess("Ok");
    },
  });

  return { query, mutation };
}
