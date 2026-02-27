import { CircularProgress, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useMutation } from "@tanstack/react-query";
import { patchJoblist } from "./Joblist.service";
import { queryClient } from "../../queryClient";
import type { JobCmd } from "./Job";
import type { SyntheticEvent } from "react";
import { useCrew } from "../Crew/CrewContext";
import ErrorHandler from "../Utils/Error/ErrorHandler";

interface AcknowledgeButtonProps {
  jobId: string;
  icon?: boolean;
}

export default function AcknowledgeButton(props: AcknowledgeButtonProps) {
  const { jobId, icon } = props;
  const { crew } = useCrew();
  const mutation = useMutation({
    mutationKey: ["Missions", crew?.CrewId, jobId],
    mutationFn: patchJoblist,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["Missions", crew?.CrewId] }),
  });

  const onClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    const cmd: JobCmd = { IsJob: true, JobId: jobId };
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
        {mutation.isError && (
          <ErrorHandler error={mutation.error} onClose={() => mutation.reset()} />
        )}
      </>
    );
}
