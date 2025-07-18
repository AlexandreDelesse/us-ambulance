import { FormControl, MenuItem, Select, type SelectProps } from "@mui/material";

const transportModes = [
  { id: 1, name: "Ambulance" },
  { id: 2, name: "Vsl" },
  { id: 3, name: "Taxi" },
  { id: 4, name: "SNG" },
  { id: 6, name: "SNG" },
];
export default function TransportModeSelect(props: SelectProps) {
  return (
    <FormControl>
      <Select
        size={props.size}
        value={props.value}
        onChange={props.onChange}
        displayEmpty
      >
        <MenuItem value="">{props.label}</MenuItem>
        {transportModes.map((t) => (
          <MenuItem value={t.name} key={t.id}>
            {t.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
