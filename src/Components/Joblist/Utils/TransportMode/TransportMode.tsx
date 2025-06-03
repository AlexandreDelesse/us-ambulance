interface TransportModeProps {
  mode: number;
}

export default function TransportMode(props: TransportModeProps) {
  const { mode } = props;
  const transportModes = [
    { id: 1, name: "Ambulance" },
    { id: 2, name: "Vsl" },
    { id: 3, name: "Taxi" },
    { id: 4, name: "SNG" },
    { id: 6, name: "SNG" },
  ];

  const getTransportMode = (id: number) => {
    return transportModes.find((el) => el.id === id);
  };

  const transportMode = getTransportMode(mode);

  return (
    <>{transportMode ? transportMode.name : "mode de transport inconnu"}</>
  );
}
