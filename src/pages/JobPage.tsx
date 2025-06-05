import { Box } from "@mui/material";
import BottomNavbar from "../Components/Nav/BottomNavbar";
import RestoreIcon from "@mui/icons-material/Restore";
import InfoIcon from "@mui/icons-material/Info";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { Outlet } from "react-router";

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
      <Outlet />
      <BottomNavbar links={links} />
    </Box>
  );
}
