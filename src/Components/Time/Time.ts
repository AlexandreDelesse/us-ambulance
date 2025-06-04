export interface Time {
  OnSiteTime: string | null;
  TerminatedTime: string | null;
  GoTime: string | null;
}

export interface DisplayTimeStep {
  key: keyof Time;
  index: number;
  label: string;
  timestamp: string;
}

export interface TimeCmd {
  OnSiteTime: string | null;
  TerminatedTime: string | null;
  GoTime: string | null;
}

export interface DisplayTimeQry {
  steps: DisplayTimeStep[];
  activeStep?: DisplayTimeStep;
}
