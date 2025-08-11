import { notificationClient, regulApi } from "../../api/client";
// import type { WorkSession } from "./WorkSession.model";

// const mockWorkSession: WorkSession = {
//   EmployeeId: 1,
//   EndTime: null,
//   StartTime: new Date().toISOString(),
//   WorkSessionId: 32234,
// };
export const getWorkSession = async (userId: string) => {
  return (await regulApi.get("Employee/" + userId + "WorkSession")).data;
  // return mockWorkSession;
};

export const ackWorkSession = async (userId: string, sessionId: string) => {
  return (
    await notificationClient.post(
      "Employee/" + userId + "/KorkSession/" + sessionId,
      JSON.stringify("Acknoledged")
    )
  ).data;
};
