import { Box } from "@mui/material";
import BottomNavbar from "../Components/Nav/BottomNavbar";
import { Outlet } from "react-router";

export default function HomePage() {
  return (
    <Box height="100%" paddingBottom={7}>
      <Outlet />
      <BottomNavbar />
    </Box>
  );
}
