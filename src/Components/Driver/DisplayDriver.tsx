import { Button } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import type { Driver, VehicleModel } from "./Driver";

interface DisplayDriverProps {
  driver: Driver;
  vehicleModel: VehicleModel;
  driverCollection: Driver[];
  isLoading?: boolean;
  onClick: (driver: Driver, collection: Driver[]) => void;
}
export default function DisplayDriver(props: DisplayDriverProps) {
  return (
    <Button
      disabled={false}
      loading={props.isLoading}
      onClick={() => props.onClick(props.driver, props.driverCollection)}
      size="large"
      variant="contained"
      color="primary"
      startIcon={<DirectionsCarIcon />}
      fullWidth
    >
      {props.vehicleModel.Immatriculation || ""} | {props.driver.DriverName}
    </Button>
  );
}
