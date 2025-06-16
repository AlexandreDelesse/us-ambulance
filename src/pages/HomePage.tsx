import { Box } from "@mui/material";
import BottomNavbar from "../Components/Nav/BottomNavbar";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TaxiAlertIcon from "@mui/icons-material/TaxiAlert";
import GroupsIcon from "@mui/icons-material/Groups";
import { Outlet } from "react-router";
import { useUser } from "../Components/User/UserContext";

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

  return (
    <Box height="100%" paddingBottom={7}>
      <Outlet />
      <BottomNavbar links={roles?.includes("admin") ? adminLinks : links} />
    </Box>
  );
}
