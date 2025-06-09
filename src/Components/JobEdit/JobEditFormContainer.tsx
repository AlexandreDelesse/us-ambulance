import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getFormStructure } from "./FormStructure.service";
import type { FormField } from "./FormStructure";
import type { AxiosError } from "axios";
import useQueryPresenter from "../Utils/useQueryPresenter";
import JobEditForm from "./JobEditForm";
import QueryComponent from "../Utils/QueryComponent";

export default function JobEditFormContainer() {
  const { jobId } = useParams();
  const query = useQuery<FormField[], AxiosError>({
    queryKey: ["FormStructure", jobId],
    queryFn: () => getFormStructure(jobId!),
  });

  console.log("isQuery loading : ", query.isLoading, query.isRefetching);

  const presenter = useQueryPresenter((formStructure: FormField[]) => (
    <JobEditForm formFields={formStructure} />
  ));

  return QueryComponent(query, presenter);
}
