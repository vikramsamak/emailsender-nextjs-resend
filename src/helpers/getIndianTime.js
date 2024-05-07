export function getIndianTime(dateString) {
  let date = new Date(dateString);

  let indianDate = new Date(
    date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
  );

  let day = indianDate.getDate().toString().padStart(2, "0");
  let month = (indianDate.getMonth() + 1).toString().padStart(2, "0");
  let year = indianDate.getFullYear();
  let hours = indianDate.getHours().toString().padStart(2, "0");
  let minutes = indianDate.getMinutes().toString().padStart(2, "0");
  let seconds = indianDate.getSeconds().toString().padStart(2, "0");

  let indianTimeString = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

  return indianTimeString;
}
