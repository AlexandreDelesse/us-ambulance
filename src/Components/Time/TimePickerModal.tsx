import { Box, Button, Modal, Typography } from "@mui/material";
import type { DisplayTimeStep } from "./Time";
import { useState } from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { PickerValue } from "@mui/x-date-pickers/internals";

interface TimePickerModalProps {
  toggle: () => void;
  step?: DisplayTimeStep;
  onUpdate: (step: DisplayTimeStep, newValue: string) => void;
  onReset: (step: DisplayTimeStep) => void;
  canReset: boolean;
  isPending: boolean;
}
export default function TimePickerModal(props: TimePickerModalProps) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    margin: "auto",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    p: 4,
  };

  const [value, setValue] = useState<Dayjs | null>(
    dayjs(props.step?.timestamp)
  );

  const handleSave = () => {
    if (!props.step || !value) return;
    props.onUpdate(props.step, value?.toISOString());
  };

  const handleReset = () => {
    if (!props.step) return;
    props.onReset(props.step);
  };

  const handleChange = (date: PickerValue) => {
    setValue(dayjs(date?.toISOString()));
  };

  return (
    <Modal open={!!props.step} onClose={props.toggle}>
      <Box sx={style}>
        <Typography variant="h5">Mettre à jour l'heure</Typography>
        <Box my={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Choississez une heure"
              value={value}
              onChange={handleChange}
              ampm={false}
              views={["hours", "minutes"]}
            />
          </LocalizationProvider>
        </Box>

        <Box display={"flex"} gap={1} my={1}>
          <Button
            disabled={props.isPending}
            onClick={handleSave}
            variant="contained"
            color="success"
          >
            Valider
          </Button>
          <Button
            disabled={props.isPending}
            onClick={props.toggle}
            color="secondary"
            variant="outlined"
          >
            Annuler
          </Button>

          {props.canReset && (
            <Button
              disabled={props.isPending}
              onClick={handleReset}
              color="warning"
            >
              Reset
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
