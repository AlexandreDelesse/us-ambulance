import {
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  type SelectProps,
} from "@mui/material";

const cities = [
  "Toulon",
  "Hyères",
  "St Maximin",
  "La Seyne",
  "St Tropez",
  "Fréjus",
];

export default function CitySelect(props: SelectProps) {
  return (
    <FormControl>
      <Select
        size={props.size}
        value={props.value}
        onChange={props.onChange}
        displayEmpty
      >
        <MenuItem value="">Ville</MenuItem>
        {cities.map((city) => (
          <MenuItem value={city} key={city}>
            {city}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
