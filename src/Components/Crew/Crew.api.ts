import client from "../../api/client";
import type { Crew } from "./Crew.model";

export const getCrewList = async () => (await client.get("Login")).data;

export const getLocalCrew = () =>
  JSON.parse(localStorage.getItem("CREW") || "null");

export const setLocalCrew = (crew: Crew) =>
  localStorage.setItem("CREW", JSON.stringify(crew));

export const removeLocalCrew = () => localStorage.removeItem("CREW");
