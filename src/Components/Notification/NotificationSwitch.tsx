import { Box, Switch, Typography } from "@mui/material";
import { useNotifications } from "./Notification.service";

export default function NotificationSwitch() {
  const { notificationStatus, subscribe, unSubscribe, isLoading, isNotifStateLoading } =
    useNotifications();

  const handleSwitchClick = () =>
    notificationStatus ? unSubscribe() : subscribe();

  return (
    <Box display={"flex"} alignItems={"center"} gap={1}>
      <Typography>Notifications</Typography>
      <Switch
        disabled={isLoading || isNotifStateLoading}
        onClick={handleSwitchClick}
        checked={notificationStatus}
      />
    </Box>
  );
}
