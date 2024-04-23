export function getIndianTime(dateString) {
  let date = new Date(dateString);

  date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  return date.toISOString();
}
