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
  const [value, setValue] = React.useState(myPath || "");
  const navigate = useNavigate();

  const actions = props.links.map((l) => ({
    value: l.pathname,
    label: l.label,
    icon: l.icon,
    key: l.label,
  }));

  //FIXME: Les liens ne s'affichent pas en bleu au rechargement de la page
  return (
    <Box position="fixed" left={0} bottom={0} width="100%">
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
          navigate(newValue, { replace: true });
        }}
      >
        {actions.map((action) => (
          <BottomNavigationAction {...action} />
        ))}
      </BottomNavigation>
    </Box>
  );
}
