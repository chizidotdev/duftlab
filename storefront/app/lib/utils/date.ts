export const formatDate = (dateObj: Date | string): string => {
  if (!dateObj) return "-";

  const date = new Date(dateObj);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
