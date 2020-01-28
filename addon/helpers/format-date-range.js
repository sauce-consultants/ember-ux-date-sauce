import {
  helper
} from '@ember/component/helper';
import {
  formatDateRange as formatDateRangeFunc
} from '../utils/format-date-range';

export function formatDateRange(params /*, hash*/ ) {
  return formatDateRangeFunc(params[0]);
}

export default helper(formatDateRange);