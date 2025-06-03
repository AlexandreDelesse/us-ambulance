import { Alert, AlertTitle, Box, Typography } from "@mui/material";

import type { DisplayMecanicLog } from "./MecanicLog";

interface MecanicLogListProps {
  mecanicLogList: DisplayMecanicLog[];
}
export default function MecanicLogList(props: MecanicLogListProps) {
  if (MecanicLogList.length <= 0)
    return (
      <Box>
        <Typography marginY={4} textAlign="center">
          Aucun incident en cours
        </Typography>
      </Box>
    );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {props.mecanicLogList.map((mecanicLog) => (
        <Alert severity={mecanicLog.Severity} key={mecanicLog.LogId}>
          <AlertTitle>
            {mecanicLog.LastStateDate &&
              new Date(mecanicLog.LastStateDate).toLocaleDateString()}
          </AlertTitle>
          {mecanicLog.Report}
        </Alert>
      ))}
    </Box>
  );
}
