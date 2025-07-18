import { useEffect, useState } from "react";
import type { TransportInfos } from "../Commande.model";
import { FormControl, TextField, type TextFieldProps } from "@mui/material";
import CitySelect from "./CitySelect";
import TransportModeSelect from "./TransportModeSelect";

const defaultTransportInfos: TransportInfos = {
  city: "",
  ref: "",
  transportMode: "",
  transportType: "",
};

type TransportInfosFormProps = {
  onChange?: (address: TransportInfos) => void;
  value?: TransportInfos;
} & Omit<TextFieldProps, "value" | "onChange">;
export default function TransportInfosForm(props: TransportInfosFormProps) {
  const [transportInfos, setTransportInfos] = useState(
    props.value ?? defaultTransportInfos
  );

  useEffect(() => props.onChange && props.onChange(transportInfos));
  return (
    <FormControl
      fullWidth
      sx={{
        gap: 1,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      <CitySelect
        value={transportInfos.city}
        label="Ville"
        size={props.size}
        onChange={(e) =>
          setTransportInfos((old) => ({
            ...old,
            city: e.target.value as string,
          }))
        }
      />
      <TextField
        value={transportInfos.ref}
        label="Ref"
        size={props.size}
        onChange={(e) =>
          setTransportInfos((old) => ({ ...old, ref: e.target.value }))
        }
      />

      <TransportModeSelect
        value={transportInfos.transportMode}
        label="Mode de transport"
        size={props.size}
        onChange={(e) =>
          setTransportInfos((old) => ({
            ...old,
            transportMode: e.target.value as string,
          }))
        }
      />
      <TextField
        value={transportInfos.transportType}
        label="Type de transport"
        size={props.size}
        onChange={(e) =>
          setTransportInfos((old) => ({
            ...old,
            transportType: e.target.value,
          }))
        }
      />
    </FormControl>
  );
}
