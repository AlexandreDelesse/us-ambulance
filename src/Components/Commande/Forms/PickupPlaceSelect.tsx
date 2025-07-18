import { FormControl, MenuItem, Select, type SelectProps } from "@mui/material";
import React from "react";

const pickUpPlaces = [
  "Hopital St Anne",
  "Hopital St Musse",
  "Polyclinique des Fleurs",
  "Clinique St Michel",
  "Clinique du Cap d'OR",
];

export default function PickupPlaceSelect(props: SelectProps) {
  return (
    <FormControl>
      <Select
        size={props.size}
        value={props.value}
        onChange={props.onChange}
        displayEmpty
      >
        <MenuItem value="">{props.label}</MenuItem>
        {pickUpPlaces.map((city) => (
          <MenuItem value={city} key={city}>
            {city}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
