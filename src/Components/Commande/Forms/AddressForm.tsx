import { FormControl, TextField, type TextFieldProps } from "@mui/material";
import type { Address } from "../Commande.model";
import { useEffect, useState } from "react";
import CitySelect from "./CitySelect";
import PickupPlaceSelect from "./PickupPlaceSelect";

const defaultAdress: Address = {
  city: "",
  completeAddress: "",
  label: "",
};

type AddressFormProps = {
  onChange?: (address: Address) => void;
  value?: Address;
  isDomicil?: boolean;
} & Omit<TextFieldProps, "value" | "onChange">;
export default function AddressForm(props: AddressFormProps) {
  const [adress, setAdress] = useState(props.value ?? defaultAdress);

  useEffect(() => props.onChange && props.onChange(adress), [adress]);

  return (
    <FormControl fullWidth sx={{ gap: 1 }}>
      {props.isDomicil && (
        <TextField
          {...props}
          label="Residence/Immeuble.."
          placeholder="Residence/Immeuble.."
          value={adress.label}
          onChange={(e) =>
            setAdress((old) => ({ ...old, label: e.target.value }))
          }
        />
      )}

      {!props.isDomicil && (
        <PickupPlaceSelect
          label="Lieu de départ/arrivé"
          size="small"
          value={adress.completeAddress}
          onChange={(e) =>
            setAdress((old) => ({
              ...old,
              completeAddress: e.target.value as string,
            }))
          }
        />
      )}

      {props.isDomicil && (
        <CitySelect
          value={adress.city}
          onChange={(e) =>
            setAdress((old) => ({ ...old, city: e.target.value as string }))
          }
          size="small"
        />
      )}
    </FormControl>
  );
}
