import { Box } from "@mui/material";
import TopAppBar from "../Components/Nav/TopAppBar";
import { Outlet } from "react-router";
import NotificationModal from "../Components/Notification/NotificationModal";

export default function MainPage() {
  return (
    <Box height="100%" paddingTop={7}>
      <TopAppBar />
      <Outlet />
      <NotificationModal />
    </Box>
  );
}
