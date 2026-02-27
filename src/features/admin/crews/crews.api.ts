import { z } from "zod";
import { adminClient } from "../../../api/client";
import { AdminCrewSchema } from "./crew.schema";

export const getCrewList = async (): Promise<z.infer<typeof AdminCrewSchema>[]> => {
  const response = await adminClient.get("Login");
  return z.array(AdminCrewSchema).parse(response.data);
};