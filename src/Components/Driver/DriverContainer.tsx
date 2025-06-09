import { useMutation, useQuery } from "@tanstack/react-query";
import { getDriver, postDriver } from "./Driver.service";
import useQueryPresenter from "../Utils/useQueryPresenter";
import type { Driver, DriverQry } from "./Driver";
import DisplayDriver from "./DisplayDriver";
import QueryComponent from "../Utils/QueryComponent";
import type { AxiosError } from "axios";
import { queryClient } from "../../queryClient";
import { Button } from "@mui/material";

export default function DriverContainer() {
  const query = useQuery<DriverQry, AxiosError>({
    queryKey: ["Driver", 233415],
    queryFn: () => getDriver(233415),
  });

  const mutation = useMutation({
    mutationKey: ["Driver", 233415],
    mutationFn: (driverId: number) => postDriver(233415, driverId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["Driver", 233415] }),
  });

  const handleOnClick = (driver: Driver, collection: Driver[]) => {
    let newDriver = collection.filter((d) => d.DriverId !== driver.DriverId)[0];
    if (!newDriver) return;
    return mutation.mutate(newDriver.DriverId);
  };

  const presenter = useQueryPresenter<DriverQry>(
    (data: DriverQry) => (
      <DisplayDriver
        driver={data.SelectedDriver}
        vehicleModel={data.VehicleModel ?? undefined}
        driverCollection={data.DriversCollection}
        onClick={handleOnClick}
        isLoading={mutation.isPending || query.isLoading}
      />
    ),
    () => <Button loading disabled fullWidth />
  );
  return QueryComponent(query, presenter);
}
