import { Box, Typography } from "@mui/material";
import TopAppBar from "../Components/Nav/TopAppBar";
import { Outlet } from "react-router";
import NotificationModal from "../Components/Notification/NotificationModal";
import { useUser } from "../Components/User/UserContext";
import WaitingVerif from "../assets/attente-verification.png";

export default function MainPage() {
  return (
    <Box height="100%" paddingTop={7}>
      <TopAppBar />
      <Outlet />
      <NotificationModal />
    </Box>
  );
}
