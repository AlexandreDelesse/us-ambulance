import { TextField } from "@mui/material";
import type { FormField } from "../FormStructure";

interface TextInputFieldProps {
  field: FormField;
  onChange: (value: string) => void;
}

export default function TextInputField({ field, onChange }: TextInputFieldProps) {
  return (
    <TextField
      sx={{ my: 1 }}
      size="small"
      fullWidth
      value={field.Value ?? ""}
      label={field.Label}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}