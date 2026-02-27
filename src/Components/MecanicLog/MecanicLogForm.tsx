import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../queryClient";
import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import SendIcon from "@mui/icons-material/Send";
import ErrorHandler from "../Utils/Error/ErrorHandler";
import { postMecanicLog } from "./MecanicLog.service";
import { useCrew } from "../Crew/CrewContext";

export default function MecanicLogForm() {
  const [show, setShow] = useState(false);
  const [constat, setConstat] = useState("");
  const { crew } = useCrew();

  const mutation = useMutation({
    mutationKey: ["MecanicLogs", crew?.CrewId],
    mutationFn: () => postMecanicLog({ Constat: constat, CrewId: crew?.CrewId ?? -1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["MecanicLogs", crew?.CrewId] });
      setConstat("");
      setShow(false);
    },
  });

  const handleSubmit = () => {
    if (!constat) return;
    mutation.mutate();
  };

  if (!show)
    return (
      <Button
        startIcon={<CarCrashIcon />}
        variant="contained"
        onClick={() => setShow(!show)}
      >
        Nouvel incident
      </Button>
    );

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 1, flexDirection: "column" }}>
        <TextField
          onChange={(e) => setConstat(e.target.value)}
          multiline
          rows={4}
          label="Incident"
          placeholder="Décrivez l'incident ici"
        />
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            startIcon={<SendIcon />}
            disabled={mutation.isPending || !constat}
          >
            Envoyer
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setShow(!show)}
            disabled={mutation.isPending}
          >
            Annuler
          </Button>
        </Box>
        {mutation.isError && (
          <ErrorHandler onClose={mutation.reset} error={mutation.error} />
        )}
      </Box>
    </Box>
  );
}
