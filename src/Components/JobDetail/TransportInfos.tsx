import { Box } from "@mui/material";
import PropertyDisplay from "../Utils/Templates/PropertyDisplay";

interface TransportInfosProps {
  schedule: string;
  transportMode: string;
}
export default function TransportInfos(props: TransportInfosProps) {
  return (
    <Box
      my={3}
      display={"grid"}
      gridTemplateColumns={"repeat(auto-fit, minmax(140px, 1fr))"}
      gap={2}
    >
      <PropertyDisplay title="Prise en charge" content={props.schedule} />

      <PropertyDisplay
        title="Transport"
        content={props.transportMode} //TODO: Remove parseint and act with numbers
      />
    </Box>
  );
}
