import client from "../../api/client";

export const getFormStructure = async (jobId: string) => {
  const request = await client.get("FormStructure/" + jobId);
  return request.data;
};
