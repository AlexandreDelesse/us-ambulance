interface TimeDisplayerProps {
  isoDate: string;
  options?: Intl.DateTimeFormatOptions;
  locale?: string;
}
export default function DisplayTime(props: TimeDisplayerProps) {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  const defaultLocale = "fr-FR";

  if (!props.isoDate) return <>-</>;

  if (props.isoDate)
    return (
      <>
        {new Date(props.isoDate).toLocaleTimeString(
          defaultLocale,
          defaultOptions
        )}
      </>
    );
}
