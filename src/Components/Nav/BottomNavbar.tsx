import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import React, { type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";

interface link {
  pathname: string;
  label: string;
  icon: ReactNode;
}

interface BottomNavbarProps {
  links: link[];
}
export default function BottomNavbar(props: BottomNavbarProps) {
  const location = useLocation();
  const paths = location.pathname.split("/");
  const myPath = paths[paths.length - 1];
  console.log(location)
  console.log(myPath)
  const [value, setValue] = React.useState(myPath || "");

  const navigate = useNavigate();
  //FIXME: Les liens ne s'affichent pas en bleu au rechargement de la page
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
        {props.links.map((link) => (
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
