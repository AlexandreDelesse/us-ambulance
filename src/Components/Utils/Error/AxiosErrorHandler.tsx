import { Alert } from "@mui/material";
import type { AxiosError } from "axios";
import { type ReactNode } from "react";

interface AxiosErrorHandlerProps {
  error: AxiosError;
  custom404Render?: ReactNode;
  onClose?: (e: React.SyntheticEvent) => void;
}
export default function AxiosErrorHandler(props: AxiosErrorHandlerProps) {
  const { error, custom404Render } = props;

  if (custom404Render && error.status === 404) return custom404Render;
  return (
    <Alert sx={{ marginY: 2 }} onClose={props.onClose} severity="warning">
      {error.message}
    </Alert>
  );
}
