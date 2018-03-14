import Component from '@ember/component';
import layout from '../../templates/components/uxs-date-range/day';
import {
  get,
} from '@ember/object';
import moment from 'moment';

export default Component.extend({
  date: null,
  tagName: '',
  layout,
  format: 'DD/MM/YY',
  // Actions
  actions: {
    setDate(dates, formattedDate, ref) {
      const action = get(this, 'onChange'),
        format = get(this, 'format'),
        day = moment.utc(formattedDate, format),
        range = [
          day.startOf('day').clone(),
          day.endOf('day').clone(),
        ];

      if (action) {
        action(range, formattedDate, ref);
      }
    },
  }
});