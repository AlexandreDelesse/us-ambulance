export interface Driver {
  DriverId: number;
  DriverName: string;
}

export interface VehicleModel {
  VehicleID: number;
  Immatriculation: string;
}

export interface DriverQry {
  DriversCollection: Driver[];
  SelectedDriver: Driver;
  ChangeDate: string;
  VehicleModel: VehicleModel;
}
