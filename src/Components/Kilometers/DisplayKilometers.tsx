import { useQuery } from "@tanstack/react-query";
import { getKilometer } from "./Kilometer.service";
import useQueryPresenter from "../Utils/useQueryPresenter";

import { Typography } from "@mui/material";
import QueryComponent from "../Utils/QueryComponent";
import type { AxiosError } from "axios";
import type { Kilometers } from "./Kilometer";

export default function DisplayKilometers() {
  const query = useQuery<Kilometers, AxiosError>({
    queryKey: ["Kilometers"],
    queryFn: () => getKilometer(233415),
  });

  const success = (data: Kilometers) => <Typography>{data.Km} Km</Typography>;
  const loading = () => (
    <Typography>Chargement de la dernière saisie...</Typography>
  );

  const presenter = useQueryPresenter(success, loading);
  return QueryComponent(query, presenter);
}
