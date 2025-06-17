import { useQuery } from "@tanstack/react-query";
import client from "../../api/client";
import type { Job, JobCmd } from "./Job";
import type { AxiosError } from "axios";

export const getJoblist = async (intCrewId: number) => {
  const request = await client.get("/Joblist/" + intCrewId);
  return request.data.JobList;
};

export const patchJoblist = async (command: JobCmd) =>
  await client.patch("/Joblist", command);

export function useGetJoblist(crewId?: number) {
  const query = useQuery<Job[], AxiosError>({
    queryKey: ["Missions", crewId],
    queryFn: () => getJoblist(crewId || -1),
  });

  return query;
}
