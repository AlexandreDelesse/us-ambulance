import { Box, Button } from "@mui/material";
import type { FormField } from "./FormStructure";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router";
import { patchJobEdit } from "./JobEdit.service";
import { queryClient } from "../../queryClient";
import type { JobEditCmd } from "./JobEdit";
import ErrorHandler from "../Utils/Error/ErrorHandler";
import SelectField from "./Fields/SelectField";
import CheckboxField from "./Fields/CheckboxField";
import PhoneListField from "./Fields/PhoneListField";
import MailListField from "./Fields/MailListField";
import TextInputField from "./Fields/TextInputField";

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
    const updatedFields = formData.map((f) =>
      f.Name === field.Name ? { ...f, Value: value } : f
    );
    setFormData(updatedFields);
    if (field.InstantUpdate) saveForm(updatedFields);
  };

  const saveForm = (cmd?: FormField[]) => {
    const mapToCmd = (cmd || formData).map((data) => ({
      AttributName: data.Name,
      AttributValue: data.Value,
    }));
    mutation.mutate(mapToCmd);
  };

  const renderField = (field: FormField) => {
    const onChange = (value: string) => updateField(field, value);
    switch (field.Type) {
      case "Select":
        return <SelectField key={field.Name} field={field} onChange={onChange} />;
      case "PhoneList":
        return <PhoneListField key={field.Name} field={field} onChange={onChange} />;
      case "MailList":
        return <MailListField key={field.Name} field={field} onChange={onChange} />;
      case "Checkbox":
        return <CheckboxField key={field.Name} field={field} onChange={onChange} />;
      default:
        return <TextInputField key={field.Name} field={field} onChange={onChange} />;
    }
  };

  return (
    <Box>
      {formData.map(renderField)}
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