import { AppBar, Avatar, Box, Toolbar } from "@mui/material";
import logo from "../../assets/logo-us.png";
import UserAvatar from "../User/UserAvatar";
import { useNavigate } from "react-router";

export default function TopAppBar() {
  const navigate = useNavigate();
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Avatar onClick={() => navigate("/")} src={logo} />
        {/* For separation */}
        <Box flex={1} />
        <UserAvatar />
      </Toolbar>
    </AppBar>
  );
}
