import client from "../../api/client";
import type { JobEditCmd } from "./JobEdit";

export const patchJobEdit = async (jobId: string, jobEditCmd: JobEditCmd[]) => {
  const request = await client.patch("JobEdit/" + jobId, jobEditCmd);
  console.log("req data : ", request.data);
  return request.data;
};
