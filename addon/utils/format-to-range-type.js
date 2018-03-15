import {
  isEmpty
} from '@ember/utils';

export default function formatToRangeType(formattedDate) {
  if (isEmpty(formattedDate)) {
    return null;
  }
  // is Week
  if (formattedDate.indexOf("-W") !== -1) {
    return 'Week';
  }
  // is Quarter
  if (formattedDate.indexOf("-Q") !== -1) {
    return 'Quarter';
  }
  // is Custom
  if (formattedDate.indexOf("..") !== -1) {
    return 'Custom';
  }
  // is Month
  if (formattedDate.indexOf("-") !== -1) {
    return 'Month';
  }
  // is Day
  if (formattedDate.indexOf("/") !== -1) {
    return 'Day';
  }
  // is Year
  if (formattedDate.length === 4) {
    return 'Year';
  }
  return null;
}