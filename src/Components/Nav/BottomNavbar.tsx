import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TaxiAlertIcon from "@mui/icons-material/TaxiAlert";
import React from "react";
import { useLocation, useNavigate } from "react-router";

export default function BottomNavbar() {
  const location = useLocation();
  console.log(location);
  const [value, setValue] = React.useState(location.pathname || "");
  console.log(value === location.pathname);

  const navigate = useNavigate();

  const links = [
    {
      pathname: "/",
      label: "Missions",
      icon: <AssignmentIcon />,
    },
    {
      pathname: "/Vehicule",
      label: "Véhicule",
      icon: <TaxiAlertIcon />,
    },
  ];

  return (
    <Box position="fixed" left={0} bottom={0} width="100%">
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          navigate(newValue);
        }}
      >
        {links.map((link) => (
          <BottomNavigationAction
            value={link.pathname}
            label={link.label}
            icon={link.icon}
            key={link.label}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
}
