import { z } from "zod";

export const AdminCrewSchema = z
  .object({
    CrewId: z.number(),
    Token: z.string().nullable(),
    Label: z.string(),
    Member1: z.string(),
    Member2: z.string(),
    Immat: z.string(),
    Start: z.string(),
    End: z.string(),
  })
  .transform((data) => ({
    CrewId: data.CrewId,
    Token: data.Token ?? "",
    Label: data.Label,
    Employee1: data.Member1,
    Employee2: data.Member2,
    Immat: data.Immat,
    Start: data.Start,
    End: data.End,
  }));

export type AdminCrew = z.infer<typeof AdminCrewSchema>;
