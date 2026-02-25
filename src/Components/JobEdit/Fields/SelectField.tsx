import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { FormField } from "../FormStructure";

interface SelectFieldProps {
  field: FormField;
  onChange: (value: string) => void;
}

export default function SelectField({ field, onChange }: SelectFieldProps) {
  const fieldOptions = field.Options || {};
  return (
    <FormControl size="small" sx={{ width: "100%", my: 1 }}>
      <InputLabel>{field.Label}</InputLabel>
      <Select
        value={field.Value ?? "-1"}
        onChange={(e) => onChange(e.target.value)}
        label={field.Label}
      >
        <MenuItem value="-1">Aucune selection</MenuItem>
        {Object.keys(fieldOptions).map((key) => (
          <MenuItem key={key} value={key}>
            {fieldOptions[key]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}