import {
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import DisplayKilometers from "./DisplayKilometers";
import { useMutation } from "@tanstack/react-query";
import { postKilometer } from "./Kilometer.service";
import { useState } from "react";
import { useNavigate } from "react-router";
import ErrorHandler from "../Utils/Error/ErrorHandler";
import { useCrew } from "../Crew/CrewContext";
import { queryClient } from "../../queryClient";

export default function KilometerForm() {
  const [input, setInput] = useState("");
  const { crew } = useCrew();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["Kilometers", crew?.CrewId],
    mutationFn: (km: number) => postKilometer(crew?.CrewId ?? -1, km),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["Kilometers", crew?.CrewId] }),
  });

  const km = Number(input);
  const save = () => {
    if (!input || isNaN(km) || km <= 0) return;
    mutation.mutate(km);
  };

  return (
    <Card
      sx={{
        my: 2,
        maxWidth: "400px",
        position: "absolute",
        left: "50%",
        top: "40%",
        transform: "translate(-50%,-50%)",
      }}
      elevation={0}
    >
      <CardHeader
        title={
          <Typography variant="h4" textAlign="center">
            Kilometrage véhicule
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="caption">Derniere saisie</Typography>
        <DisplayKilometers />
        <TextField
          label={"Km"}
          sx={{ my: 1 }}
          size="small"
          inputMode="numeric"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <Button
          onClick={save}
          size="medium"
          variant="contained"
          color="primary"
          disabled={mutation.isPending || !input || km <= 0 || isNaN(km)}
        >
          Valider
        </Button>
        <Button color="secondary" onClick={() => navigate("/")}>
          Skip
        </Button>

        {mutation.isError && (
          <ErrorHandler
            error={mutation.error}
            complementMsg="Veuillez entrer le kilometrage"
            onClose={mutation.reset}
          />
        )}
      </CardContent>
    </Card>
  );
}
