export function startOfQuarter(date) {
  date = date.startOf('month').clone();

  for (var i = 0; i <= 3; i++) {
    var m = date.format("MM");
    if (m === "01" || m === "04" || m === "07" || m === "10") {
      continue;
    } else {
      date.subtract(1, 'month');
    }
  }
  return date.startOf('month');
}

export function endOfQuarter(date) {
  date = date.endOf('month').clone();

  for (var i = 0; i <= 3; i++) {
    var m = date.format("MM");
    if (m === "03" || m === "06" || m === "09" || m === "12") {
      continue;
    } else {
      date.add(1, 'month');
    }
  }
  return date.endOf('month');
}

export default {
  startOfQuarter,
  endOfQuarter,
}