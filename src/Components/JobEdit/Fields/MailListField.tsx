import ListItemInput from "../ListItemInput";
import type { FormField } from "../FormStructure";

interface MailListFieldProps {
  field: FormField;
  onChange: (value: string) => void;
}

export default function MailListField({ field, onChange }: MailListFieldProps) {
  const mailList = field.Value ? JSON.parse(field.Value) : [];
  return (
    <ListItemInput
      itemName="Email"
      inputMode="email"
      values={mailList}
      onChange={onChange}
      addLabel="Ajouter un email"
    />
  );
}