import type { QueryPresenter } from "../Utils/QueryComponent";
import type { Signature } from "./Signature";
import DisplaySignature from "./DisplaySignature";
import type { AxiosError } from "axios";
import ErrorHandler from "../Utils/Error/ErrorHandler";
import LogoLoader from "../Utils/LogoLoader";
import SignatureForm from "./SignatureForm";

export default function SignaturePresenter(): QueryPresenter<Signature> {
  const presentSuccess = (signature: Signature) => (
    <DisplaySignature signature={signature} />
  );
  const presentError = (error: AxiosError) =>
    error.status === 404 ? <SignatureForm /> : <ErrorHandler error={error} />;

  const presentLoading = () => <LogoLoader />;

  return {
    presentError,
    presentLoading,
    presentSuccess,
  };
}
