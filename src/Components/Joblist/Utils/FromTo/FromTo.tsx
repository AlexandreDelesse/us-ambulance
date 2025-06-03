import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import FlagIcon from "@mui/icons-material/Flag";
import SportsScoreIcon from "@mui/icons-material/SportsScore";

interface FromToProps {
  from: string;
  to: string;
}
export default function FromTo(props: FromToProps) {
  const { from, to } = props;

  return (
    <div>
      <Box sx={{ display: "flex", gap: 1 }}>
        <FlagIcon color="warning" /> {from}
        <Typography variant="body1"></Typography>
      </Box>

      <Divider variant="middle" sx={{ marginY: 2 }} />

      <Box sx={{ display: "flex", gap: 1 }}>
        <SportsScoreIcon color="success" /> {to}
        <Typography variant="body1"></Typography>
      </Box>
    </div>
  );
}
