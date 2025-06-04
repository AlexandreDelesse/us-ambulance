import client from "../../api/client";
import type { JobCmd } from "./Job";

export const getJoblist = async (intCrewId: number) => {
  const request = await client.get("/Joblist/" + intCrewId);
  return request.data.JobList;
};

export const patchJoblist = async (command: JobCmd) =>
  await client.patch("/Joblist", command);
