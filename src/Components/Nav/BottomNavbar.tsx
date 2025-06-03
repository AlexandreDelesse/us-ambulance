import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TaxiAlertIcon from "@mui/icons-material/TaxiAlert";
import React from "react";
import { useNavigate } from "react-router";

export default function BottomNavbar() {
  const [value, setValue] = React.useState("");

  const navigate = useNavigate();

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
        <BottomNavigationAction
          value={""}
          label="Missions"
          icon={<AssignmentIcon />}
        />
        <BottomNavigationAction
          value={"Vehicule"}
          label="Véhicule"
          icon={<TaxiAlertIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
