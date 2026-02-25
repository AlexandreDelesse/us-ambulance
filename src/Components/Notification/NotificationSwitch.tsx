import { Box, Switch, Typography } from "@mui/material";
import { useNotifications } from "./Notification.service";

export default function NotificationSwitch() {
  const { hasSubscription, subscribe, unSubscribe, isLoading, notificatioNStatus, isNotifStateLoading } =
    useNotifications();
  const handleSwitchClick = () =>
    hasSubscription ? unSubscribe() : subscribe();

  return (
    <Box display={"flex"} alignItems={"center"} gap={1}>
      <Typography>Notifications</Typography>
      <Switch
        disabled={isLoading || isNotifStateLoading}
        onClick={handleSwitchClick}
        checked={notificatioNStatus}
      />
    </Box>
  );
}
