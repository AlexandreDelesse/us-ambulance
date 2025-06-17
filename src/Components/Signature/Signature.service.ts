import client from "../../api/client";
import type { SignatureCmd } from "./Signature";

export const getSignature = async (jobId: string) => {
  const request = await client.get("Signature/" + jobId);
  return request.data;
};

export const postSignature = async (jobId: string, signature: SignatureCmd) => {
  await client.post("Signature/" + jobId, signature);
};
