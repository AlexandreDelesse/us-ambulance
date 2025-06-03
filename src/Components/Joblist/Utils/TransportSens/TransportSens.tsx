import React from "react";

interface ITransportSensProps {
  sens: number;
}
export default function TransportSens(props: ITransportSensProps) {
  const { sens } = props;

  const transportSensEnum = [
    { id: 1, name: "Aller" },
    { id: 2, name: "Retour" },
  ];

  const getTransportSens = (id: number) => {
    return transportSensEnum.find((el) => el.id === id);
  };

  const transportSens = getTransportSens(sens);
  return (
    <>{transportSens ? transportSens.name : "Sens de transport inconnu"}</>
  );
}
