import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getJobDetail } from "../Components/JobDetail/JobDetail.service";
import QueryComponent from "../Components/Utils/QueryComponent";
import useQueryPresenter from "../Components/Utils/useQueryPresenter";
import type { JobDetail } from "../Components/JobDetail/JobDetail";
import JobDetailComponent from "../Components/JobDetail/JobDetailComponent";
import type { AxiosError } from "axios";

export default function JobDetailPage() {
  const { jobId } = useParams();

  const query = useQuery<JobDetail, AxiosError>({
    queryKey: ["JobDetail", jobId],
    queryFn: () => getJobDetail(jobId!),
  });

  const presenter = useQueryPresenter<JobDetail>((jobDetail: JobDetail) => (
    <JobDetailComponent jobDetail={jobDetail} />
  ));

  return QueryComponent(query, presenter);
}
