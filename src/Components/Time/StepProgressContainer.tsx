import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getDisplaySteps, updateTime } from "./Time.service";
import useQueryPresenter from "../Utils/useQueryPresenter";
import type { DisplayTimeQry, DisplayTimeStep } from "./Time";
import StepProgress from "./StepProgress";
import QueryComponent from "../Utils/QueryComponent";
import type { AxiosError } from "axios";
import { queryClient } from "../../queryClient";
import { useState } from "react";

export default function StepProgressContainer() {
  const { jobId } = useParams();
  const [loadingStep, setLoadingStep] = useState<number>();
  const [editingStep, setEditingStep] = useState<DisplayTimeStep>();

  const query = useQuery<DisplayTimeQry, AxiosError>({
    queryKey: ["Time", jobId],
    queryFn: () => getDisplaySteps(jobId!),
  });

  type Test = {
    jobId: string;
    step: DisplayTimeStep;
    steps: DisplayTimeStep[];
    newValue: string | null;
  };

  const mutation = useMutation({
    mutationKey: ["Time", jobId],
    mutationFn: (test: Test) =>
      updateTime(test.jobId, test.step, test.steps, test.newValue),
    onSuccess: () => {
      setEditingStep(undefined);
      setLoadingStep(undefined);
      queryClient.invalidateQueries({ queryKey: ["Time", jobId] });
    },
  });

  const handleUpdate = (step: DisplayTimeStep, newValue: string) => {
    updateStep(step, newValue);
  };

  const handleClick = (step: DisplayTimeStep) => {
    if (!!step.timestamp) return setEditingStep(step);
    return updateStep(step, new Date().toISOString());
  };

  const handleReset = (step: DisplayTimeStep) => {
    updateStep(step, null);
  };

  const updateStep = (step: DisplayTimeStep, newValue: string | null) => {
    if (!query.data?.steps) return;
    setLoadingStep(step.index);
    let steps = query.data?.steps;
    mutation.mutate({ jobId: jobId!, step, steps, newValue });
  };
  const cancelEdit = () => setEditingStep(undefined);

  const presenter = useQueryPresenter<DisplayTimeQry>((qry: DisplayTimeQry) => (
    <StepProgress
      steps={qry.steps}
      activeStep={qry.activeStep}
      loadingStepIndex={loadingStep}
      onClick={handleClick}
      onUpdate={handleUpdate}
      edidintStep={editingStep}
      cancelEdit={cancelEdit}
      onReset={handleReset}
    />
  ));

  return <>{QueryComponent(query, presenter)}</>;
}
