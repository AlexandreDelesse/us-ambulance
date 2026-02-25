import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import type { FormField } from "../FormStructure";

interface CheckboxFieldProps {
  field: FormField;
  onChange: (value: string) => void;
}

export default function CheckboxField({ field, onChange }: CheckboxFieldProps) {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            name={field.Name}
            onChange={(e) => onChange(e.target.checked.toString())}
            checked={field.Value === "true"}
          />
        }
        label={field.Label}
      />
    </FormGroup>
  );
}