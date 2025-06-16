import { Box, Typography } from "@mui/material";
import type { Signature } from "./Signature";
interface DisplaySignatureProps {
  signature: Signature;
}
export default function DisplaySignature(props: DisplaySignatureProps) {
  return (
    <>
      <Box width={"100%"}>
        <img width={"100%"} src={props.signature.Data} alt="" />
      </Box>
      <Typography sx={{ marginTop: 4 }}>
        Signé le {new Date(props.signature.DateTime).toLocaleDateString()} à{" "}
        {new Date(props.signature.DateTime).toLocaleTimeString()}
      </Typography>
    </>
  );
}
