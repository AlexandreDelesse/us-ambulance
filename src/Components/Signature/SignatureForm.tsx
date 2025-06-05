import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";

// import ReactSignatureCanvas from "react-signature-canvas";
import SignaturePad from "react-signature-pad-wrapper";
import { Box, Button, Card } from "@mui/material";
import { useParams } from "react-router";
import { putSignature } from "./Signature.service";
import type { Signature } from "./Signature";
import ErrorHandler from "../Utils/Error/ErrorHandler";

export default function SignatureForm() {
  const { jobId } = useParams();

  const signRef = useRef<SignaturePad>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["Signature"],
    mutationFn: (signature: Signature) => putSignature(jobId!, signature),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["Signature"] }),
  });

  const saveSignature = () => {
    if (!signRef.current || signRef.current.isEmpty()) return;
    const dataUrl = signRef.current.toDataURL();
    mutation.mutate({ data: dataUrl });
  };

  const clearSignature = () => signRef.current?.clear();

  return (
    <>
      <Box border={"1px solid blue"}>
        <SignaturePad
          options={{ minWidth: 2, maxWidth: 4, penColor: "rgb(66, 133, 244)" }}
          redrawOnResize
          ref={signRef}
        />
      </Box>
      <Box mt={2} display={"flex"} gap={2}>
        <Button
          variant="contained"
          onClick={saveSignature}
          disabled={mutation.isPending || signRef.current?.isEmpty()}
        >
          Envoyer
        </Button>
        <Button
          color="info"
          variant="outlined"
          onClick={clearSignature}
          disabled={signRef.current?.isEmpty()}
        >
          Effacer
        </Button>
      </Box>
      {mutation.error && (
        <ErrorHandler onClose={() => mutation.reset()} error={mutation.error} />
      )}
    </>
  );
}
