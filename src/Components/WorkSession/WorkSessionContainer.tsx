import { Box } from "@mui/material";
import ErrorHandler from "../Utils/Error/ErrorHandler";
import LogoLoader from "../Utils/LogoLoader";
import useWorkSession from "./useWorkSession.service";
import WorkSessionView from "./WorkSessionView";
import type { WorkSession, WorkSessionPutCmd } from "./WorkSession.model";

export default function WorkSessionContainer() {
  const { query, mutation } = useWorkSession();

  const handleAck = (ws: WorkSession) => {
    let cmd: WorkSessionPutCmd = {
      AckTime: new Date().toISOString(),
      EmployeeId: ws.EmployeeId,
      EndTime: ws.EndTime,
      StartTime: ws.StartTime,
    };
    mutation.mutate({ id: ws.WorkSessionId, ws: cmd });
  };

  const custom404 = (
    <Box textAlign={"center"} my={2}>
      Aucun service prevue
    </Box>
  );

  if (query.isLoading) return <LogoLoader />;
  if (query.isError)
    return <ErrorHandler custom404Render={custom404} error={query.error} />;
  if (!query.data) return <>No data</>;

  return (
    <Box>
      <WorkSessionView onAck={handleAck} workSession={query.data} />
    </Box>
  );
}
