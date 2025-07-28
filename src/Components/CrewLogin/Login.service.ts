import client from "../../api/client";

export const PostLogin = async (params: { crewId: number; name: string }) =>
  (await client.post("Login", { employee: params.name, id: params.crewId }))
    .data;
