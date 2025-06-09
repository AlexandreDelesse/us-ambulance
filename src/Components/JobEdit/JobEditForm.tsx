import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import type { FormField } from "./FormStructure";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router";
import { patchJobEdit } from "./JobEdit.service";
import { queryClient } from "../../queryClient";
import type { JobEditCmd } from "./JobEdit";
import ListItemInput from "./ListItemInput";
import ErrorHandler from "../Utils/Error/ErrorHandler";

interface JobEditFormProps {
  formFields: FormField[];
}
export default function JobEditForm(props: JobEditFormProps) {
  const { jobId } = useParams();
  const [formData, setFormData] = useState<FormField[]>(props.formFields);

  useEffect(() => setFormData(props.formFields), [props.formFields]);

  const mutation = useMutation({
    mutationKey: ["JobEdit", jobId],
    mutationFn: (jobEditCmd: JobEditCmd[]) => patchJobEdit(jobId!, jobEditCmd),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["FormStructure", jobId] }),
  });

  const updateField = (field: FormField, value: string) => {
    console.log(field.Name, value);
    const updatedFields = formData.map((f) =>
      f.Name === field.Name ? { ...f, Value: value } : f
    );
    setFormData(updatedFields);
    if (field.InstantUpdate) return saveForm(updatedFields);
    return;
  };

  const saveForm = (cmd?: FormField[]) => {
    const jobEditCmd = cmd || formData;
    const mapToCmd = jobEditCmd.map((data) => ({
      AttributName: data.Name,
      AttributValue: data.Value,
    }));

    mutation.mutate(mapToCmd);
  };
  //TODO: Prendre en compte les champs Date et Nir
  //TODO: 1 fichier par composant pour la lisibilité !
  return (
    <Box>
      {formData.map((field) => {
        switch (field.Type) {
          case "Select":
            const fieldOptions = field.Options || {};
            console.log("in case : ", field.Name, field.Value);
            return (
              <FormControl size="small" sx={{ width: "100%", my: 1 }}>
                <InputLabel>{field.Label}</InputLabel>
                <Select
                  value={field.Value ?? "-1"}
                  onChange={(e) => updateField(field, e.target.value)}
                  label={field.Label}
                >
                  <MenuItem value="-1">Aucune selection</MenuItem>
                  {field.Options
                    ? Object.keys(fieldOptions)?.map((key) => (
                        <MenuItem key={key} value={key}>
                          {fieldOptions[key]}
                        </MenuItem>
                      ))
                    : null}
                </Select>
              </FormControl>
            );
          case "PhoneList":
            let phoneList = [];
            console.log("field values", field.Value, field.Value?.length);
            if (field.Value) phoneList = JSON.parse(field.Value);
            return (
              <ListItemInput
                values={phoneList}
                onChange={(v) => updateField(field, v.toString())}
                addLabel="Ajouter un téléphone"
                itemName="Téléphone"
                inputMode="numeric"
              />
            );

          case "MailList":
            let maillList = [];
            console.log("field values", field.Value, field.Value?.length);
            if (field.Value) maillList = JSON.parse(field.Value);
            return (
              <ListItemInput
                itemName="Email"
                inputMode="email"
                values={maillList}
                onChange={(v) => updateField(field, v.toString())}
                addLabel="Ajouter un email"
              />
            );
          case "Checkbox":
            return (
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={field.Name}
                      onChange={(e) =>
                        updateField(field, e.target.checked.toString())
                      }
                      checked={field?.Value === "true"}
                    />
                  }
                  label={field.Label}
                />
              </FormGroup>
            );
          default:
            return (
              <TextField
                sx={{ my: 1 }}
                size="small"
                fullWidth
                value={field.Value}
                label={field.Label}
                onChange={(e) => updateField(field, e.target.value)}
              />
            );
        }
      })}

      <Button
        loading={mutation.isPending}
        disabled={mutation.isPending}
        variant="contained"
        onClick={() => saveForm()}
      >
        Sauvegarder
      </Button>
      {mutation.isError && (
        <ErrorHandler error={mutation.error} onClose={() => mutation.reset()} />
      )}
    </Box>
  );
}
