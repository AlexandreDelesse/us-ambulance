import client from "../../api/client";

const getJoblist = async (intCrewId: number) => {
  const request = await client.get("/Joblist/" + intCrewId);
  return request.data.JobList;
};

export { getJoblist };
