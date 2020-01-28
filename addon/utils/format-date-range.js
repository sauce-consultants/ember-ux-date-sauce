import {
  helper
} from '@ember/component/helper';
import {
  isEmpty
} from '@ember/utils';
import formatToRange from 'ember-ux-date-sauce/utils/format-to-range';

/*
 * Takes a range string
 * e.g. 2020-Q1
 * Returns a human readable date description
 * e.g. 1st Jan - 31st Mar 2020
 */
export function formatDateRange(rangeStr /*, hash*/ ) {
  if (isEmpty(rangeStr)) {
    return "";
  }

  const range = formatToRange(rangeStr),
    start = range[0],
    end = range[1];

  if (isEmpty(start)) {
    return `until ${end.format('Do MMM YYYY')}`;
  }

  if (isEmpty(end)) {
    return `${start.format('Do MMM YYYY')} ongoing`;
  }

  if (start.isSame(end, 'day')) {
    return `${start.format('Do MMM YYYY')}`;
  }
  if (start.isSame(end, 'month')) {
    return `${start.format('Do')} - ${end.format('Do MMM YYYY')}`;
  }
  if (start.isSame(end, 'year')) {
    return `${start.format('Do MMM')} - ${end.format('Do MMM YYYY')}`;
  }

  return `${start.format('Do MMM YYYY')} - ${end.format('Do MMM YYYY')}`;
}

export default helper(formatDateRange);