import { Box } from "@mui/material";
import BottomNavbar from "../Components/Nav/BottomNavbar";
import RestoreIcon from "@mui/icons-material/Restore";
import InfoIcon from "@mui/icons-material/Info";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { Outlet } from "react-router";
import BackButton from "../Components/Utils/Buttons/BackButton";
import HomeButton from "../Components/Utils/Buttons/HomeButton";

export default function JobPage() {
  const links = [
    {
      pathname: "Detail",
      label: "Mission",
      icon: <InfoIcon />,
    },
    {
      pathname: "EditDetail",
      label: "Details",
      icon: <RestoreIcon />,
    },
    {
      pathname: "Signature",
      label: "Signature",
      icon: <DriveFileRenameOutlineIcon />,
    },
  ];

  return (
    <Box height="100%" paddingBottom={7}>
      <HomeButton />
      <Outlet />
      <BottomNavbar links={links} />
    </Box>
  );
}
