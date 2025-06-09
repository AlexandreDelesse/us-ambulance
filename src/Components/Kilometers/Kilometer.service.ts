import client from "../../api/client";

export const getKilometer = async (crewId: number) => {
  const request = await client.get("Kilometers/" + crewId);
  return request.data;
};

export const postKilometer = async (crewId: number, km: number) => {
  return await client.post("Kilometers/" + crewId, km);
};
