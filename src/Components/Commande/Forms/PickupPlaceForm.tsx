import {
  FormControl,
  FormControlLabel,
  Switch,
  TextField,
  type TextFieldProps,
} from "@mui/material";
import type { Address, PickupPlace } from "../Commande.model";
import { useEffect, useState } from "react";
import AddressForm from "./AddressForm";

const defaultAdress: Address = {
  city: "",
  completeAddress: "",
  label: "",
};

const defaultPickupPlace: PickupPlace = {
  place: defaultAdress,
  timestamp: "",
};

type PickupPlaceFormProps = {
  onChange?: (address: PickupPlace) => void;
  value?: PickupPlace;
} & Omit<TextFieldProps, "value" | "onChange">;
export default function PickupPlaceForm(props: PickupPlaceFormProps) {
  const [pickupPlace, setPickupPlace] = useState(
    props.value ?? defaultPickupPlace
  );

  const [isDomicil, setIsDomicil] = useState(false);

  useEffect(() => props.onChange && props.onChange(pickupPlace));

  return (
    <FormControl fullWidth sx={{ gap: 1 }}>
      <FormControlLabel
        control={
          <Switch
            checked={isDomicil}
            onChange={() => setIsDomicil(!isDomicil)}
          />
        }
        label="Domicile"
      />
      <TextField
        value={pickupPlace.timestamp}
        size={props.size}
        type="datetime-local"
        onChange={(e) =>
          setPickupPlace((old) => ({ ...old, timestamp: e.target.value }))
        }
      />

      <AddressForm
        isDomicil={isDomicil}
        size={props.size}
        value={pickupPlace.place}
        onChange={(value) =>
          setPickupPlace((old) => ({ ...old, place: value }))
        }
      />
    </FormControl>
  );
}
