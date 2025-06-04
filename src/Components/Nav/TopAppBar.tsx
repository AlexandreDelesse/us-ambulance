import { AppBar, Avatar, Box, Toolbar } from "@mui/material";
import logo from "../../assets/logo-us.png";
import UserAvatar from "../User/UserAvatar";
import { useLocation } from "react-router";

export default function TopAppBar() {
  const location = useLocation();
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Avatar src={logo} />
        {/* For separation */}
        <Box flex={1} />
        <UserAvatar />
      </Toolbar>
    </AppBar>
  );
}
