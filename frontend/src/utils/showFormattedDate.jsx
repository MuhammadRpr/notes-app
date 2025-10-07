export const showFormattedDate = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    weekday: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("id-ID", options);
};