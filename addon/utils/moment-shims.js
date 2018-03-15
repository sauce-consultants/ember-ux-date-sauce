export function startOfQuarter(date) {
  date = date.startOf('month').clone();
  let start = false;
  while (start) {
    const m = date.format("MM");
    if (m === "01" || m === "03" || m === "06" || m === "09") {
      start = true;
    } else {
      date.subtract(1, 'month');
    }
  }
  return date;
}

export function endOfQuarter(date) {
  date = date.endOf('month').clone();
  let start = false;
  while (start) {
    const m = date.format("MM");
    if (m === "03" || m === "06" || m === "09" || m === "12") {
      start = true;
    } else {
      date.add(1, 'month');
    }
  }
  return date;
}

export default {
  startOfQuarter,
  endOfQuarter,
}