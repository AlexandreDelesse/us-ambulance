import { Box } from "@mui/material";
import BottomNavbar from "../Components/Nav/BottomNavbar";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TaxiAlertIcon from "@mui/icons-material/TaxiAlert";
import { Outlet } from "react-router";

export default function HomePage() {
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
  return (
    <Box height="100%" paddingBottom={7}>
      <Outlet />
      <BottomNavbar links={links} />
    </Box>
  );
}
