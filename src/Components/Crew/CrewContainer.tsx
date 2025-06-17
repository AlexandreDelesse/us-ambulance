import { useState } from "react";
import QueryComponent from "../Utils/QueryComponent";
import useQueryPresenter from "../Utils/useQueryPresenter";
import type { Crew } from "./Crew.model";

import CrewList from "./CrewList";
import useGetCrewList from "./useCrew.service";
import { TextField } from "@mui/material";
import { useCrew } from "./CrewContext";
import { useNavigate } from "react-router";

export default function CrewContainer() {
  const [search, setSearch] = useState("");
  const query = useGetCrewList(search);
  const { setCrew } = useCrew();
  const navigate = useNavigate();

  const handleLogin = (crew: Crew) => {
    setCrew(crew);
    navigate("/Missions", { replace: true });
  };

  const presenter = useQueryPresenter<Crew[]>((crewList) => (
    <CrewList onLogin={handleLogin} crewList={crewList} />
  ));

  return (
    <>
      <TextField
        label="Rechercher"
        size="small"
        fullWidth
        sx={{ marginBottom: 1 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {QueryComponent(query, presenter)}
    </>
  );
}
