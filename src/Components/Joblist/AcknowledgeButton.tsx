import {
  Alert,
  Button,
  CircularProgress,
  IconButton,
  Snackbar,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useMutation } from "@tanstack/react-query";
import { patchJoblist } from "./Joblist.service";
import { queryClient } from "../../queryClient";
import type { JobCmd } from "./Job";
import type { SyntheticEvent } from "react";

interface AcknoledgeButtonProps {
  jobId: string;
  icon?: boolean;
}

export default function AcknowledgeButton(props: AcknoledgeButtonProps) {
  const { jobId, icon } = props;
  const mutation = useMutation({
    mutationKey: ["Missions", 233149, jobId],
    mutationFn: patchJoblist,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["Missions", 233149] }),
  });

  const onClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    let cmd: JobCmd = { IsJob: true, JobId: props.jobId };
    mutation.mutate(cmd);
  };

  if (icon)
    return (
      <>
        <IconButton
          color="success"
          onClick={onClick}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <CircularProgress size={18} sx={{ color: "blue" }} />
          ) : (
            <ThumbUpIcon color="primary" />
          )}
        </IconButton>
        <Snackbar
          open={mutation.isError}
          autoHideDuration={6000}
          onClose={mutation.reset}
        >
          <Alert
            onClose={mutation.reset}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Une erreur s'est produite !
          </Alert>
        </Snackbar>
      </>
    );
}
