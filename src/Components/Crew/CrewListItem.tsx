import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import type { Crew } from "./Crew.model";

interface CrewListItemProps {
  crew: Crew;
  onLogin: (crew: Crew) => void;
}
export default function CrewListItem(props: CrewListItemProps) {
  const handleClick = () => props.onLogin(props.crew);
  return (
    <Card elevation={0} sx={{ backgroundColor: "whitesmoke" }}>
      <CardActionArea onClick={handleClick}>
        <CardHeader
          title={props.crew.Immat}
          subheader={props.crew.Label}
          action={
            <Typography color="steelblue">{props.crew.CrewId}</Typography>
          }
        />
        <CardContent>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box>
              <Typography variant="caption">Membre 1</Typography>
              <Typography color="steelblue">{props.crew.Employee1}</Typography>
            </Box>
            <Box>
              <Typography variant="caption">Membre 2</Typography>
              <Typography color="steelblue">{props.crew.Employee2}</Typography>
            </Box>
          </Box>
          <Box>
            <Box>
              <Typography variant="caption">Début</Typography>
              <Typography>
                {new Date(props.crew.Start || "").toLocaleString()}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption">Fin</Typography>
              <Typography>
                {new Date(props.crew.End || "").toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
