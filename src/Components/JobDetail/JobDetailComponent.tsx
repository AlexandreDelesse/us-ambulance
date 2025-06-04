import { Box } from "@mui/material";
import type { JobDetail } from "./JobDetail";
import BeneficiaryInfos from "./BeneficiaryInfos";
import FromTo from "../Utils/Templates/FromTo";
import PropertyDisplay from "../Utils/Templates/PropertyDisplay";
import TransportInfos from "./TransportInfos";

interface JobDetailComponentProps {
  jobDetail: JobDetail;
}
export default function JobDetailComponent(props: JobDetailComponentProps) {
  const hasComment = !!props.jobDetail.Comments;
  return (
    <Box sx={{ marginBottom: 5 }}>
      {/* <EditableBeneficiary beneficiary={jobDetail.beneficiary} /> */}
      <BeneficiaryInfos beneficiary={props.jobDetail.Beneficiary} />

      <TransportInfos
        schedule={props.jobDetail.Schedule}
        transportMode={props.jobDetail.TransportMode}
      />

      <FromTo from={props.jobDetail.Departure} to={props.jobDetail.Arrival} />
      {/* <StepProgressView /> */}

      {hasComment && (
        <PropertyDisplay
          title="Commentaire"
          content={props.jobDetail.Comments}
        />
      )}
    </Box>
  );
}
