import client from "../../api/client";

export const getJobDetail = async (jobId: string) => {
  const request = await client.get("JobDetail/" + jobId);
  return request.data;
};
