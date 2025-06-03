import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import type { Job } from "./Job";
import TransportMode from "./Utils/TransportMode/TransportMode";
import TransportSens from "./Utils/TransportSens/TransportSens";
import AcknowledgeButton from "./AcknowledgeButton";

interface JoblistItemProps {
  job: Job;
  onClick: (jobId: string) => any;
}
export default function JoblistItem(props: JoblistItemProps) {
  return (
    <Card className="my-2" elevation={0}>
      <CardActionArea
        sx={{ paddingX: 0 }}
        onClick={() => props.onClick(props.job.JobId)}
      >
        <Box
          sx={{ display: "grid", gridTemplateColumns: "4px 1fr", padding: 1 }}
        >
          <Box
            sx={{
              paddingY: 0,
              backgroundColor: props.job.IsAck ? "#479f76" : "#ffcd39",
            }}
          />
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginLeft: 1,
              ":last-child": { padding: 0 },
            }}
          >
            <div>
              <Typography variant="body1">{props.job.Patient}</Typography>

              <Typography>
                <TransportMode mode={props.job.TransportMode} /> -{" "}
                <TransportSens sens={props.job.TransportSens} />
              </Typography>
              <Typography variant="button" color="primary">
                {props.job.schedule}
              </Typography>
            </div>

            {!props.job.IsAck ? (
              <AcknowledgeButton icon jobId={props.job.JobId} />
            ) : (
              <ExpandIcon isExpanded={false} />
            )}
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
}

interface ExpandIconProps {
  isExpanded: boolean;
}
function ExpandIcon(props: ExpandIconProps) {
  const { isExpanded } = props;
  if (isExpanded) return <KeyboardArrowDownIcon />;
  return <KeyboardArrowRightIcon />;
}
