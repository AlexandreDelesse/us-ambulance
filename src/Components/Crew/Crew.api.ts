import client from "../../api/client";

export const getCrewList = async () => (await client.get("Login")).data;
