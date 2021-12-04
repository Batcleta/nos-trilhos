function convertDate(initialDate) {
  const date = new Date(initialDate);
  return date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

export default convertDate;
