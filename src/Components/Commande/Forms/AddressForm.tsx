import {
  FormControl,
  MenuItem,
  Select,
  TextField,
  type TextFieldProps,
} from "@mui/material";
import type { Address } from "../Commande.model";
import { useEffect, useState } from "react";

const defaultAdress: Address = {
  city: "",
  completeAddress: "",
  label: "",
};

const cities = ["Toulon", "Hyères", "St Maximin", "La Seyne"];

type AddressFormProps = {
  onChange?: (address: Address) => void;
  value?: Address;
} & Omit<TextFieldProps, "value" | "onChange">;
export default function AddressForm(props: AddressFormProps) {
  const [adress, setAdress] = useState(props.value ?? defaultAdress);

  useEffect(() => props.onChange && props.onChange(adress), [adress]);

  return (
    <FormControl fullWidth sx={{ gap: 1 }}>
      <TextField
        {...props}
        label="Residence/Immeuble.."
        placeholder="Residence/Immeuble.."
        value={adress.label}
        onChange={(e) =>
          setAdress((old) => ({ ...old, label: e.target.value }))
        }
      />

      <TextField
        {...props}
        label="Adresse complète"
        placeholder="Adresse complète"
        value={adress.completeAddress}
        onChange={(e) =>
          setAdress((old) => ({ ...old, completeAddress: e.target.value }))
        }
      />

      <Select
        size={props.size}
        value={adress.city}
        onChange={(e) => setAdress((old) => ({ ...old, city: e.target.value }))}
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
