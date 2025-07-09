import { Box, Button, Stack, Typography } from "@mui/material";
import SimpleCard from "../Utils/Cards/SimpleCard";
import type { WorkSession } from "./WorkSession.model";
import { dateDisplay, timeDisplay } from "../Utils/DateTime.service";

interface WorkSessionViewProps {
  workSession: WorkSession;
  onAck: (id: string) => void;
}
export default function WorkSessionView(props: WorkSessionViewProps) {
  return (
    <Stack direction={"column"} gap={1}>
      <SimpleCard
        title={`Prochain service le ${dateDisplay(
          props.workSession.sessionStart
        )}`}
      >
        <Box display={"flex"} flexDirection={"column"}>
          {/* {KeyValueDisplay("Chauffeur", props.workSession.Username)} */}
          {KeyValueDisplay(
            "Début de service",
            timeDisplay(props.workSession.sessionStart)
          )}
          {KeyValueDisplay(
            "Fin de service",
            timeDisplay(props.workSession.sessionEnd)
          )}
          {KeyValueDisplay("Statut", props.workSession.sessionStatus)}
        </Box>
      </SimpleCard>

      {/* <SimpleCard title="Pauses prévues">
        {props.workSession.breaks.map((b) => (
          <div key={b.StartTimestamp}>
            {timeDisplay(b.StartTimestamp)} - {timeDisplay(b.EndTimestamp)}
          </div>
        ))}
      </SimpleCard> */}

      <Button onClick={() => props.onAck(props.workSession.id)}>Valider</Button>
    </Stack>
  );
}

const KeyValueDisplay = (key: string, value: any) => (
  <Box display={"flex"} justifyContent={"space-between"}>
    <Typography>{key}:</Typography>
    <Typography textAlign={"right"}>{value}</Typography>
  </Box>
);
