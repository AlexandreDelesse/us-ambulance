import type { AxiosResponse } from "axios";
import client from "../../api/client";
import type { DisplayMecanicLog } from "./MecanicLog";
import type { AlertColor } from "@mui/material";

export const getMecanicLogs = async (crewId: number) => {
  const request: AxiosResponse<DisplayMecanicLog[]> = await client.get(
    "MecanicLog/" + crewId
  );
  return (
    request.data.map((mecanicLog) => ({
      ...mecanicLog,
      Severity: getSeverity(mecanicLog.State),
    })) || []
  );
};

export const getSeverity = (logStatus: number): AlertColor => {
  switch (logStatus) {
    case 1:
      return "warning";
    case 2:
      return "info";
    case 3:
      return "success";

    default:
      return "info";
  }
};
