import type { AlertColor } from "@mui/material";

export interface MecanicLog {
  LogId: number;
  LogDate: string;
  Report: string;
  ReportState: string;
  State: number;
  LastStateDate: string | null;
  Immatriculation: string;
  Crew: string;
  Analyse: string | null;
  Action: any[] | null;
  NextDeadLine: string | null;
}

export interface DisplayMecanicLog extends MecanicLog {
  Severity: AlertColor;
}
