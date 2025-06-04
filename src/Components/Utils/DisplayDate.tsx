interface DateDisplayerProps {
  isoDate: string;
  options?: Intl.DateTimeFormatOptions;
  locale?: string;
}
export default function DisplayDate(props: DateDisplayerProps) {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  const defaultLocale = "fr-FR";

  if (!props.isoDate) return <>-</>;

  if (props.isoDate)
    return (
      <>
        {new Date(props.isoDate).toLocaleDateString(
          defaultLocale,
          defaultOptions
        )}
      </>
    );
}
