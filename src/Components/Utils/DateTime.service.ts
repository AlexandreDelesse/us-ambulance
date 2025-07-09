export const time = (d: string) => new Date(d).getTime();

export const timeDisplay = (d: string) =>
  new Date(d).toLocaleTimeString("fr-Fr", {
    hour: "2-digit",
    minute: "2-digit",
  });

export const dateDisplay = (d: string) =>
  new Date(d).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
  });
