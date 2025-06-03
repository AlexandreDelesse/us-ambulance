import { Alert, AlertTitle, Box } from "@mui/material";

import type { MecanicLog } from "./MecanicLog";

interface MecanicLogListProps {
  mecanicLogList: MecanicLog[];
}
export default function MecanicLogList(props: MecanicLogListProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {props.mecanicLogList.map((mecanicLog) => (
        <Alert severity={getLogStatus(mecanicLog.State)} key={mecanicLog.LogId}>
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
const getLogStatus = (logStatus: number) => {
  switch (logStatus) {
    case 1:
      return "warning";
    case 2:
      return "info";
    case 3:
      return "success";

    default:
      return "info";
  }
};
