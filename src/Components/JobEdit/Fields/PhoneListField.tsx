import ListItemInput from "../ListItemInput";
import type { FormField } from "../FormStructure";

interface PhoneListFieldProps {
  field: FormField;
  onChange: (value: string) => void;
}

export default function PhoneListField({ field, onChange }: PhoneListFieldProps) {
  const phoneList = field.Value ? JSON.parse(field.Value) : [];
  return (
    <ListItemInput
      values={phoneList}
      onChange={onChange}
      addLabel="Ajouter un téléphone"
      itemName="Téléphone"
      inputMode="numeric"
    />
  );
}