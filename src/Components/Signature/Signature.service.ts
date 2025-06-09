import client from "../../api/client";
import type { Signature } from "./Signature";

export const getSignature = async (jobId: string) => {
  const request = await client.get("Signature/" + jobId);
  return request.data;
};

export const postSignature = async (jobId: string, signature: Signature) => {
  await client.post("Signarure/" + jobId, signature);
};
