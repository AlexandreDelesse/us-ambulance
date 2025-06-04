import { Box } from "@mui/material";
import type { Job } from "./Job";
import JoblistItem from "./JoblistItem";

interface JoblistProps {
  joblist: Job[];
  onClick: (jobId: string) => void;
}
export default function Joblist(props: JoblistProps) {
  return (
    <>
      {props.joblist.length < 1 && (
        <Box sx={{ textAlign: "center", padding: 5 }}>Aucune mission</Box>
      )}
      <Box>
        {props.joblist.map((job: Job) => (
          <JoblistItem
            key={job.JobId}
            job={job}
            onClick={(jobId: string) => props.onClick(jobId)}
          />
        ))}
      </Box>
    </>
  );
}
