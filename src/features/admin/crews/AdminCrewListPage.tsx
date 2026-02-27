import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useCrew } from "../../../Components/Crew/CrewContext";
import type { Crew } from "../../../Components/Crew/Crew.model";
import { useCrewList } from "./crews.service";
import ErrorHandler from "../../../Components/Utils/Error/ErrorHandler";
import LogoLoader from "../../../Components/Utils/LogoLoader";
import type { AdminCrew } from "./crew.schema";

export default function AdminCrewListPage() {
  const { data, isLoading, isError, error } = useCrewList();
  const { setCrew } = useCrew();
  const navigate = useNavigate();

  const handleSelect = (adminCrew: AdminCrew) => {
    const crew: Crew = {
      CrewId: adminCrew.CrewId,
      Token: adminCrew.Token,
      Label: adminCrew.Label,
      Employee1: adminCrew.Employee1,
      Employee2: adminCrew.Employee2,
      Immat: adminCrew.Immat,
      Start: adminCrew.Start,
      End: adminCrew.End,
    };
    setCrew(crew);
    navigate("/");
  };

  if (isLoading) return <LogoLoader LoadingText="Chargement des équipages..." />;
  if (isError) return <ErrorHandler error={error} />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Équipages du jour
      </Typography>
      {data?.map((crew) => (
        <Card key={crew.CrewId} elevation={1}>
          <CardActionArea onClick={() => handleSelect(crew)}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {crew.Label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {crew.Employee1} · {crew.Employee2}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="body2">{crew.Immat || "—"}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(crew.Start).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                    {" – "}
                    {new Date(crew.End).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}