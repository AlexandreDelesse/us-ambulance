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

export default function KilometerForm() {
  const [input, setInput] = useState("");

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["Kilometers"],
    mutationFn: (km: number) => postKilometer(233415, km),
  });

  const save = () => console.log(input);

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
        <Typography color={"blue"} variant="body1">
          {/* {crew?.callSign} {crew?.vehicle} */}
        </Typography>
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
          disabled={mutation.isPending}
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
