import { createContext, useContext, useState } from "react";
import type { Crew } from "./Crew.model";

interface CrewContextType {
  crew?: Crew;
  setCrew: (crew: Crew) => void;
  resetCrew: () => void;
}

const CrewContext = createContext<CrewContextType>({
  setCrew: () => {},
  resetCrew: () => {},
});

export const useCrew = () => useContext(CrewContext);

export const CrewProvider = ({ children }: { children: React.ReactNode }) => {
  const [crew, setCrew] = useState<Crew>();

  const resetCrew = () => setCrew(undefined);

  return (
    <CrewContext.Provider value={{ crew, setCrew, resetCrew }}>
      {children}
    </CrewContext.Provider>
  );
};
