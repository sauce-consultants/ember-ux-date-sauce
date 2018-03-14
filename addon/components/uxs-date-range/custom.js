import Component from '@ember/component';
import layout from '../../templates/components/uxs-date-range/custom';
import {
  computed,
  get,
} from '@ember/object';
import moment from 'moment';

export default Component.extend({
  from: null,
  layout,
  format: 'DD/MM/YY',
  tagName: '',
  to: null,
  minDate: null,
  maxDate: null,
  // Computed
  minFromDate: computed('minDate', function() {
    const min = get(this, 'minDate');
    if (min) {
      return min;
    }
    return null;
  }),
  maxFromDate: computed('maxDate', 'to', function() {
    const format = get(this, 'format'),
      to = moment.utc(get(this, 'to'), format);
    if (to) {
      return to.toDate();
    }

    const max = get(this, 'maxDate');
    if (max) {
      return max;
    }
    return null;
  }),
  minToDate: computed('minDate', 'from', function() {
    const format = get(this, 'format'),
      from = moment.utc(get(this, 'from'), format);
    if (from) {
      return from.toDate();
    }

    const min = get(this, 'minDate');
    if (min) {
      return min;
    }
    return null;
  }),
  maxToDate: computed('maxDate', function() {
    const max = get(this, 'maxDate');
    if (max) {
      return max;
    }
    return null;
  }),
  // Actions
  actions: {
    setFrom(dates, formattedDate, ref) {
      const action = get(this, 'onChange'),
        format = get(this, 'format'),
        from = moment.utc(formattedDate, format).startOf('day').clone(),
        to = moment(get(this, 'to'), format),
        range = [
          from,
          to,
        ],
        formattedRange = `${from.format(format)}..${to.format(format)}`;

      if (action) {
        action(range, formattedRange, ref);
      }
    },
    setTo(dates, formattedDate, ref) {
      const action = get(this, 'onChange'),
        format = get(this, 'format'),
        from = moment(get(this, 'from'), format),
        to = moment.utc(formattedDate, format).startOf('day').clone(),
        range = [
          from,
          to,
        ],
        formattedRange = `${from.format(format)}..${to.format(format)}`;

      if (action) {
        action(range, formattedRange, ref);
      }
    },
  },
});