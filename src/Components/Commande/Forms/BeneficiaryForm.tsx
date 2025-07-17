import {
  FormControl,
  TextField,
  Typography,
  type TextFieldProps,
} from "@mui/material";
import type { Address, Beneficiary } from "../Commande.model";
import { useEffect, useState } from "react";
import AddressForm from "./AddressForm";

const defaultAdress: Address = {
  city: "",
  completeAddress: "",
  label: "",
};

const defaultBeneficiary: Beneficiary = {
  address: defaultAdress,
  age: "",
  birthDate: "",
  firstName: "",
  lastName: "",
  phone1: "",
  phone2: "",
};

type BeneficiaryFormProps = {
  onChange?: (address: Beneficiary) => void;
  value?: Beneficiary;
} & Omit<TextFieldProps, "value" | "onChange">;
export default function BeneficiaryForm(props: BeneficiaryFormProps) {
  const [beneficiary, setBeneficiary] = useState(
    props.value ?? defaultBeneficiary
  );

  useEffect(() => props.onChange && props.onChange(beneficiary), [beneficiary]);

  const calculatedAge = beneficiary.birthDate
    ? new Date().getFullYear() - new Date(beneficiary.birthDate).getFullYear()
    : "";

  return (
    <FormControl fullWidth sx={{ gap: 1 }}>
      <TextField
        {...props}
        label="Nom"
        placeholder="Dupont"
        value={beneficiary.lastName}
        onChange={(e) =>
          setBeneficiary((old) => ({ ...old, lastName: e.target.value }))
        }
      />
      <TextField
        {...props}
        label="Prenom"
        placeholder="Jean"
        value={beneficiary.firstName}
        onChange={(e) =>
          setBeneficiary((old) => ({ ...old, firstName: e.target.value }))
        }
      />
      <TextField
        {...props}
        type="date"
        value={beneficiary.birthDate}
        onChange={(e) =>
          setBeneficiary((old) => ({ ...old, birthDate: e.target.value }))
        }
      />
      <TextField
        {...props}
        label="Age"
        placeholder="21"
        value={calculatedAge.toString()}
        disabled
        onChange={() => {}}
      />
      <TextField
        {...props}
        label="Téléphone 1"
        placeholder="0601020304"
        value={beneficiary.phone1}
        onChange={(e) =>
          setBeneficiary((old) => ({ ...old, phone1: e.target.value }))
        }
      />
      <Typography marginTop={2} marginBottom={1}>
        Adresse
      </Typography>{" "}
      <AddressForm
        size={props.size}
        value={beneficiary.address}
        onChange={(value) =>
          setBeneficiary((old) => ({ ...old, address: value }))
        }
      />
    </FormControl>
  );
}
