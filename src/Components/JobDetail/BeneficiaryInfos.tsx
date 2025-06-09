import { Typography } from "@mui/material";
import type { Beneficiary } from "./JobDetail";
import PropertyDisplay from "../Utils/Templates/PropertyDisplay";

interface BeneficiaryInfosProps {
  beneficiary: Beneficiary;
}
export default function BeneficiaryInfos(props: BeneficiaryInfosProps) {
  const hasPhones = props.beneficiary.Phones
    ? props.beneficiary.Phones.length > 0
    : false;
  const hasAgeOrDDN = props.beneficiary.Age || props.beneficiary.DDN;

  if (!props.beneficiary) return <></>;
  return (
    <>
      <Typography variant="h5" fontSize={18}>
        {props.beneficiary.CompleteName}
      </Typography>
      {hasAgeOrDDN && (
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          Né le {props.beneficiary.DDN} - {props.beneficiary.Age}
        </Typography>
      )}

      <PropertyDisplay
        contentColor="orange"
        title="Téléphone"
        content={
          hasPhones
            ? props.beneficiary.Phones!.map((phone) => <div>{phone}</div>)
            : "-"
        }
      />
    </>
  );
}
