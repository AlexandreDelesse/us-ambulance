export interface WorkSession {
  StartTime: string;
  EndTime: string | null;
  EmployeeId: number;
  WorkSessionId: number;
}

export interface WorkSessionPutCmd {
  EmployeeId: number;
  StartTime: string;
  EndTime: string | null;
  AckTime: string | null;
}
