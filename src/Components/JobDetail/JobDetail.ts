export interface JobDetail {
  TransportMode: string;
  IsSerial: boolean;
  TransportSens: string;
  Schedule: string;
  Appointment: string;
  Departure: string;
  Arrival: string;
  Comments: string | null;
  IsLastDay: boolean;
  Beneficiary: Beneficiary;
}

export interface Beneficiary {
  CompleteName: string;
  DDN: string | null;
  Age: string | null;
  Phones: string[];
}
