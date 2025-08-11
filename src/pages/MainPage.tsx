import { Box, Typography } from "@mui/material";
import TopAppBar from "../Components/Nav/TopAppBar";
import { Outlet } from "react-router";
// import NotificationModal from "../Components/Notification/NotificationModal";
import WaitingVerif from "../assets/attente-verification.png";
import { useUser } from "../Components/User/UserContext";

export default function MainPage() {
  const { user } = useUser();

  if (!user?.emailVerified)
    return (
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={2}
        position={"absolute"}
        top={"20%"}
        left={"50%"}
        sx={{ transform: "translate(-50%,0)" }}
      >
        {/* <UserAvatar /> */}
        <Typography textAlign={"center"} fontSize={18} variant="h4">
          En attente de validation du compte
        </Typography>
        <img width={"100%"} src={WaitingVerif} />
        <Typography>{user?.username}</Typography>
      </Box>
    );

  return (
    <Box height="100%" paddingTop={7}>
      <TopAppBar />
      <Outlet />
      {/* <NotificationModal /> */}
    </Box>
  );
}
