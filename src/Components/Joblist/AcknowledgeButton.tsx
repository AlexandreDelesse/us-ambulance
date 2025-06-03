import {
  Alert,
  Button,
  CircularProgress,
  IconButton,
  Snackbar,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

interface AcknoledgeButtonProps {
  jobId: string;
  icon?: boolean;
}

export default function AcknowledgeButton(props: AcknoledgeButtonProps) {
  const { jobId, icon } = props;
  // const { onClickOnAck, isPending, error, reset } =
  //   AcknowledgeButtonViewModel();
  //   const ackMutation = useAckJobMutation();

  //   const isLoading =
  //     ackMutation.variables?.jobId === jobId && ackMutation.isLoading;

  // const handleOnAck = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   e.stopPropagation();
  //   onClickOnAck(jobId);
  // };

  if (icon)
    return (
      <>
        {/* <IconButton
          color="success"
          onClick={(e) => handleOnAck(e)}
          disabled={isPending}
        >
          {isPending ? (
            <CircularProgress size={18} sx={{ color: "blue" }} />
          ) : (
            <ThumbUpIcon color="primary" />
          )}
        </IconButton>
        <Snackbar open={!!error} autoHideDuration={6000} onClose={reset}>
          <Alert
            onClose={reset}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Une erreur s'est produite !
          </Alert>
        </Snackbar> */}
      </>
    );

  return (
    <></>
    // <Button
    //   sx={{ width: "100%" }}
    //   startIcon={
    //     isPending ? (
    //       <CircularProgress size={16} sx={{ color: "#fff" }} />
    //     ) : (
    //       <ThumbUpIcon />
    //     )
    //   }
    //   variant="contained"
    //   color="success"
    //   onClick={(e) => handleOnAck(e)}
    //   disabled={isPending}
    // >
    //   Ok !
    // </Button>
  );
}
