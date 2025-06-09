import { Box } from "@mui/material";
import TopAppBar from "../Components/Nav/TopAppBar";
import { Outlet } from "react-router";

export default function MainPage() {
  return (
    <Box height="100%" paddingTop={7}>
      <TopAppBar />
      <Outlet />
    </Box>
  );
}
