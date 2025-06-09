import { Box, Button, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface ListItemInputProps {
  values: string[];
  onChange: (values: string) => void;
  addLabel?: string;
  itemName?: string;
  inputMode?:
    | "search"
    | "text"
    | "none"
    | "email"
    | "tel"
    | "url"
    | "numeric"
    | "decimal"
    | undefined;
}
export default function ListItemInput(props: ListItemInputProps) {
  const handleChange = (index: number, value: string) => {
    const newValues = props.values.map((v, i) => (index === i ? value : v));
    props.onChange(JSON.stringify(newValues));
  };

  const deleteItem = (index: number) => {
    const newValues = props.values.filter((_v, i) => i !== index);
    props.onChange(JSON.stringify(newValues));
  };

  const addItem = () => {
    props.onChange(JSON.stringify([...props.values, ""]));
  };

  return (
    <>
      {props.values.map((value: string, index: number) => (
        <Box key={index} sx={{ display: "flex" }}>
          <TextField
            size="small"
            fullWidth
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            label={`${props.itemName ?? "item"} ${index + 1}`}
            // error={!!getError(index)}
            // helperText={getError(index)?.msg}
            inputMode={props.inputMode ?? "text"}
          />
          <IconButton
            onClick={() => deleteItem(index)}
            sx={{ alignSelf: "baseline", mt: "8px" }}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      ))}
      <Button onClick={addItem} startIcon={<AddCircleIcon />}>
        {props.addLabel ?? "Ajouter un element"}
      </Button>
    </>
  );
}
