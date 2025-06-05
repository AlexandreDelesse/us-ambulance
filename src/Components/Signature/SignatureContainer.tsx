import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getSignature } from "./Signature.service";
import SignaturePresenter from "./SignaturePresenter";
import QueryComponent from "../Utils/QueryComponent";
import type { Signature } from "./Signature";
import type { AxiosError } from "axios";
import axios from "axios";

export default function SignatureContainer() {
  const { jobId } = useParams();

  const query = useQuery<Signature, AxiosError>({
    queryKey: ["Signature"],
    queryFn: () => getSignature(jobId!),
    retry: (failureCount, error) => {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return false;
      }
      return failureCount < 2;
    },
  });

  const presenter = SignaturePresenter();

  return QueryComponent(query, presenter);
}
