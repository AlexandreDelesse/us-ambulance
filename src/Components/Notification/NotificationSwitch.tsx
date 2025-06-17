import { Box, Switch, Typography } from "@mui/material";
import { useNotifications } from "./Notification.service";

export default function NotificationSwitch() {
  const { hasSubscription, subscribe, unSubscribe } = useNotifications();
  const handleSwitchClick = () =>
    hasSubscription ? unSubscribe() : subscribe();

  return (
    <Box display={"flex"} alignItems={"center"} gap={1}>
      <Typography>Notifications</Typography>
      <Switch onClick={handleSwitchClick} checked={hasSubscription} />
    </Box>
  );
}
