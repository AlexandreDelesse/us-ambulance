import client from "../../api/client";
import type { DisplayTimeQry, DisplayTimeStep, Time, TimeCmd } from "./Time";

const emptyTimeCmd = {
  GoTime: null,
  OnSiteTime: null,
  TerminatedTime: null,
};

export const getTime = async (jobId: string) => {
  const request = await client.get("Time/" + jobId);
  return request.data;
};

export const patchTime = async (jobId: string, timeCmd: TimeCmd) => {
  await client.patch("Time/" + jobId, timeCmd);
};

export const getDisplaySteps = async (
  jobId: string
): Promise<DisplayTimeQry> => {
  const timeData: Time = await getTime(jobId);

  const steps = Object.keys(timeData).map((key, index) => ({
    key: key as keyof Time,
    index,
    label: getStepDisplayLabel(key as keyof Time),
    timestamp: timeData[key as keyof Time] || "",
  }));

  const activeStep = steps.find((step) => !step.timestamp); //La première étape qui n'a pas de timestamp.

  return { steps, activeStep };
};

export const canReset = (
  steps: DisplayTimeStep[],
  editingStep?: DisplayTimeStep,
  activeStep?: DisplayTimeStep
) => {
  if (!editingStep) return false;
  if (!activeStep) {
    if (editingStep.index == steps.length - 1) return true;
    else return false;
  } else if (editingStep.index == activeStep.index - 1) return true;
  else return false;
};

export const updateTime = async (
  jobId: string,
  updateStep: DisplayTimeStep,
  displayTimeSteps: DisplayTimeStep[],
  newValue: string | null
) => {
  const timeCmd: TimeCmd = emptyTimeCmd;
  displayTimeSteps.forEach(
    (step) =>
      (timeCmd[step.key] =
        updateStep.key === step.key ? newValue : step.timestamp)
  );
  await patchTime(jobId, timeCmd);
};

const getStepDisplayLabel = (key: keyof Time) => {
  switch (key) {
    case "GoTime":
      return "En route";
    case "OnSiteTime":
      return "Sur place";
    case "TerminatedTime":
      return "Dispo";
    default:
      return "Unknown";
  }
};
