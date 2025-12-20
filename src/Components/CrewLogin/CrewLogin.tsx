import { Button, FormGroup, TextField } from "@mui/material";
import { useState } from "react";
import { useCrew } from "../Crew/CrewContext";
import { useMutation } from "@tanstack/react-query";
import { PostLogin } from "./Login.service";
import ErrorHandler from "../Utils/Error/ErrorHandler";

export default function CrewLogin() {
  const { crew, setCrew } = useCrew();
  const [value, setValue] = useState({
    name: crew?.Employee1 ?? crew?.Employee2 ?? "",
    crewId: crew?.CrewId.toString() || "",
  });

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (params: { name: string; crewId: number }) => PostLogin(params),
  });

  //   if (crew)
  //     return (
  //       <Button fullWidth onClick={() => navigate("Missions")}>
  //         Voir mes missions
  //       </Button>
  //     );

  const handleLogin = async () => {
    if (!value.name || !value.crewId) return;
    const crew = await mutation.mutateAsync({
      name: value.name,
      crewId: parseInt(value.crewId),
    });
    setCrew(crew);
  };

  return (
    <FormGroup sx={{ gap: 1 }}>
      <TextField
        size="small"
        label="Nom"
        value={value.name}
        onChange={(e) => setValue((old) => ({ ...old, name: e.target.value }))}
      />
      <TextField
        size="small"
        label="Code"
        value={value.crewId}
        onChange={(e) =>
          setValue((old) => ({ ...old, crewId: e.target.value }))
        }
      />

      <Button fullWidth onClick={handleLogin}>
        Voir mes missions
      </Button>
      {mutation.isError && (
        <ErrorHandler error={mutation.error} onClose={mutation.reset} />
      )}
    </FormGroup>
  );
}
