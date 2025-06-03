export interface Job {
  Index: number;
  JobId: string;
  Patient: string;
  TransportMode: number;
  TransportType: number;
  TransportSens: number;
  IsSerial: boolean;
  IsAck: boolean;
  IsTerminated: boolean;
  schedule: string;
  Appointment: string | null;
  Departure: string;
  Arrival: string;
}
