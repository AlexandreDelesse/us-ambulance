import {
  Box,
  CircularProgress,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import type { DisplayTimeStep } from "./Time";
import DisplayTime from "../Utils/DisplayTime";
import TimePickerModal from "./TimePickerModal";
import { canReset } from "./Time.service";

interface StepProgressProps {
  steps: DisplayTimeStep[];
  activeStep?: DisplayTimeStep;
  loadingStepIndex?: number;
  edidintStep?: DisplayTimeStep;
  onClick: (step: DisplayTimeStep) => void;
  onReset: (step: DisplayTimeStep) => void;
  onUpdate: (step: DisplayTimeStep, newValue: string) => void;
  cancelEdit: () => void;
}
export default function StepProgress(props: StepProgressProps) {
  const isStepLoading = (stepIndex: number | undefined) =>
    !!(props.loadingStepIndex && props.loadingStepIndex === stepIndex);

  return (
    <Box sx={{ marginTop: 5 }}>
      <Stepper
        activeStep={props.activeStep?.index ?? props.steps.length}
        alternativeLabel
      >
        {props.steps.map((step, index) => (
          <Step key={step.key}>
            <StepButton
              onClick={() => props.onClick(step)}
              icon={isStepLoading(step.index) && <CircularProgress size={18} />}
            >
              <Typography>{step.label || `Etape ${step.index}`}</Typography>
              <Typography variant="caption">
                <DisplayTime isoDate={step.timestamp} />
              </Typography>
            </StepButton>
          </Step>
        ))}
      </Stepper>

      <TimePickerModal
        isPending={isStepLoading(props.edidintStep?.index)}
        step={props.edidintStep}
        canReset={canReset(props.steps, props.edidintStep, props.activeStep)}
        toggle={props.cancelEdit}
        onUpdate={props.onUpdate}
        onReset={props.onReset}
      />
    </Box>
  );
}
