export function formatDate(
  date: string | Date | null | undefined,
): string {
  if (!date) return "Not Provided";

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return "Invalid Date";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric", // 4-digit year
  }).format(parsedDate);
}