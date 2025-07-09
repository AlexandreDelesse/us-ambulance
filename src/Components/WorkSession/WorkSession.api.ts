import { notificationClient } from "../../api/client";

export const getWorkSession = async (userId: string) => {
  return (await notificationClient.get("WorkSession/" + userId)).data;
};

export const ackWorkSession = async (sessionId: string) => {
  return (
    await notificationClient.post(
      "WorkSession/" + sessionId + "/status",
      JSON.stringify("Acknoledged")
    )
  ).data;
};
