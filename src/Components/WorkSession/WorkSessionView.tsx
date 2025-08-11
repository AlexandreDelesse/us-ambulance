import { Stack, Typography } from "@mui/material";
import type { WorkSession } from "./WorkSession.model";

interface WorkSessionViewProps {
  workSession: WorkSession;
  onAck: (id: string) => void;
}
export default function WorkSessionView(props: WorkSessionViewProps) {
  return (
    <Stack direction={"column"} gap={1}>
      <Typography variant="h5" textAlign={"center"} my={2}>
        Prochain service
      </Typography>
      <Typography variant="h5" textAlign={"center"} my={2}>
        {new Date(props.workSession.StartTime).toLocaleString()}
      </Typography>

      {/* <SimpleCard title="Pauses prévues">
        {props.workSession.breaks.map((b) => (
          <div key={b.StartTimestamp}>
            {timeDisplay(b.StartTimestamp)} - {timeDisplay(b.EndTimestamp)}
          </div>
        ))}
      </SimpleCard> */}

      {/* <Button onClick={() => props.onAck(props.workSession)}>Valider</Button> */}
    </Stack>
  );
}
