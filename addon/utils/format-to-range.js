import {
  startOfQuarter,
  endOfQuarter
} from '../utils/moment-shims';
import formatToRangeType from '../utils/format-to-range-type';
import moment from 'moment';

export default function formatToRange(formattedDate) {
  const type = formatToRangeType(formattedDate);

  switch (type) {
    case "Day":
      var day = moment.utc(formattedDate, 'DD/MM/YY');
      return [
        day.startOf('day').clone(),
        day.endOf('day').clone(),
      ];
    case "Week":
      var week = moment.utc(formattedDate, 'YYYY-[W]WW');
      return [
        week.startOf('isoWeek').clone(),
        week.endOf('week').clone().add(6, 'hours'),
      ];
    case "Month":
      var month = moment.utc(formattedDate, 'YYYY-MM');
      return [
        month.startOf('month').clone(),
        month.endOf('month').clone(),
      ];
    case "Quarter":
      var quarter = moment.utc(formattedDate, 'YYYY-[Q]Q');
      return [
        startOfQuarter(quarter),
        endOfQuarter(quarter),
      ];
    case "Year":
      var year = moment.utc(formattedDate, 'YYYY');
      return [
        year.startOf('year').clone(),
        year.endOf('year').clone(),
      ];
    case "Custom":
      var
        date = formattedDate.split('..'),
        start = moment.utc(date[0], 'DD/MM/YY'),
        end = moment.utc(date[1], 'DD/MM/YY');
      return [
        start.startOf('day'),
        end.endOf('day'),
      ];
    default:
      return null;
  }
}