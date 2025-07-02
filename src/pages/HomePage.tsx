import { Box, Typography } from "@mui/material";
import BottomNavbar from "../Components/Nav/BottomNavbar";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TaxiAlertIcon from "@mui/icons-material/TaxiAlert";
import GroupsIcon from "@mui/icons-material/Groups";
import { Outlet } from "react-router";
import { useUser } from "../Components/User/UserContext";
import WaitingVerif from "../assets/attente-verification.png";

export default function HomePage() {
  const { user } = useUser();
  const roles = user?.roles;
  const links = [
    {
      pathname: "Missions",
      label: "Missions",
      icon: <AssignmentIcon />,
    },
    {
      pathname: "Vehicule",
      label: "Véhicule",
      icon: <TaxiAlertIcon />,
    },
  ];

  const adminLinks = [
    ...links,
    {
      pathname: "CrewList",
      label: "Crews",
      icon: <GroupsIcon />,
    },
  ];

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
    <Box height="100%" paddingBottom={7}>
      <Outlet />
      <BottomNavbar links={roles?.includes("admin") ? adminLinks : links} />
    </Box>
  );
}
