import { Grid } from "@mui/material";
import type { Crew } from "./Crew.model";
import CrewListItem from "./CrewListItem";

interface CrewListProps {
  crewList: Crew[];
  onLogin: (crew: Crew) => void;
}
export default function CrewList(props: CrewListProps) {
  return (
    <Grid container spacing={1}>
      {props.crewList.map((crew) => (
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <CrewListItem crew={crew} onLogin={props.onLogin} />
        </Grid>
      ))}
    </Grid>
  );
}
