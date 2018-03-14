import moment from 'moment';

export default function formattedDateRange(startDate, endDate) {

  startDate = moment(startDate);
  endDate = moment(endDate);

  if (startDate.isSame(endDate, 'day')) {
    return `${startDate.format('Do MMM YYYY')}`;
  }
  if (startDate.isSame(endDate, 'month')) {
    return `${startDate.format('Do')} - ${endDate.format('Do MMM YYYY')}`;
  }
  if (startDate.isSame(endDate, 'year')) {
    return `${startDate.format('Do MMM')} - ${endDate.format('Do MMM YYYY')}`;
  }

  return `${startDate.format('Do MMM YYYY')} - ${endDate.format('Do MMM YYYY')}`;
}