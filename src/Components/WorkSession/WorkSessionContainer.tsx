import { Box } from "@mui/material";
import ErrorHandler from "../Utils/Error/ErrorHandler";
import LogoLoader from "../Utils/LogoLoader";
import useWorkSession from "./useWorkSession.service";
import WorkSessionView from "./WorkSessionView";

export default function WorkSessionContainer() {
  const { query, mutation } = useWorkSession();

  const handleAck = (id: string) => mutation.mutate(id);

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
