import client from "../../api/client";

export const getDriver = async (crewId: number) => {
  const request = await client.get("Driver/" + crewId);
  return request.data;
};

export const postDriver = async (crewId: number, driverId: number) => {
  await client.post("Driver/" + crewId, driverId, {
    headers: { "Content-Type": "application/json" },
  });
};
