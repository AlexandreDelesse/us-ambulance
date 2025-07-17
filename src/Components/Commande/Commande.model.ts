export interface TransportCmd {
  transportInfos: TransportInfos;
  beneficiary: Beneficiary;
  pickup: PickupPlace;
  drop: PickupPlace;
}

export interface PickupPlace {
  timestamp: string;
  place: Address;
}

export interface Beneficiary {
  firstName: string;
  lastName: string;
  birthDate: string;
  age: string;
  phone1: string;
  phone2: string;
  address: Address;
}
export interface Address {
  label: string;
  completeAddress: string;
  city: string;
}

export interface TransportInfos {
  transportType: string;
  transportMode: string;
  city: string;
  ref: string;
}
