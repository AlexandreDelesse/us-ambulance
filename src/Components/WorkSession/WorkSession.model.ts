export interface WorkSession {
  id: string;
  kcUserId: string;
  sessionStart: string;
  sessionEnd: string;
  sessionStatus: string;
  breaks: Break[];
}

interface Break {
  StartTimestamp: string;
  EndTimestamp: string;
  Duration: string;
}

export const defaultWorkSession: WorkSession = {
  id: "1",
  kcUserId: "21",
  breaks: [
    {
      StartTimestamp: "2025-07-08T10:00:00.00Z",
      EndTimestamp: "2025-07-08T11:00:00.00Z",
      Duration: "1h00",
    },
  ],
  sessionStart: "2025-07-08T05:00:00.00Z",
  sessionEnd: "2025-07-08T17:00:00.00Z",
  sessionStatus: "Alexandre DELESSE",
};
