import { AppBar, Avatar, Box, Toolbar } from "@mui/material";
import logo from "../../assets/logo-us.png";
import UserAvatar from "../User/UserAvatar";
import { useLocation, useNavigate } from "react-router";
import BackButton from "../Utils/Buttons/BackButton";

export default function TopAppBar() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const isHomePage = location.pathname === "/";

  return (
    <AppBar position="fixed">
      <Toolbar>
        {!isHomePage && <BackButton color="inherit" />}

        {!isHomePage && <Box flex={1} />}
        <Avatar onClick={() => navigate("/")} src={logo} />
        {/* For separation */}

        <Box flex={1} />
        <UserAvatar />
      </Toolbar>
    </AppBar>
  );
}
