import { Box } from "@mui/material";
import type { Signature } from "./Signature";
interface DisplaySignatureProps {
  signature: Signature;
}
export default function DisplaySignature(props: DisplaySignatureProps) {
  return (
    <>
      <Box
        sx={{ backgroundImage: `url(${props.signature.data})` }}
        className="mt-3 imgContainer"
      />
      {/* <Typography sx={{ marginTop: 4 }}>
        Signé le {signature.signedOn} à {signature.signedAt}
      </Typography> */}
    </>
  );
}
