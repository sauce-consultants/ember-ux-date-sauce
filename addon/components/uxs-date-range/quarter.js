import Component from '@ember/component';
import layout from '../../templates/components/uxs-date-range/quarter';
import {
  computed,
  get,
} from '@ember/object';
import moment from 'moment';
import {
  startOfQuarter,
  endOfQuarter
} from '../../utils/moment-shims';

export default Component.extend({
  // Attributes
  layout,
  format: 'YYYY-[Q]Q',
  tagName: '',
  minDate: moment.utc('2000', 'YYYY').startOf('year').toDate(),
  maxDate: moment.utc('2010', 'YYYY').endOf('year').toDate(),
  // Computed
  quarter: computed('value', 'format', function() {
    const value = get(this, 'value'),
      format = get(this, 'format');

    return moment.utc(value, format).format('Q');
  }),
  year: computed('value', 'format', function() {
    const value = get(this, 'value'),
      format = get(this, 'format');

    return moment.utc(value, format).format('YYYY');
  }),
  quarterOptions: computed('minDate', 'maxDate', 'year', function() {
    const minDate = get(this, 'minDate'),
      maxDate = get(this, 'maxDate'),
      currentYear = get(this, 'year'),
      options = [],
      date = moment.utc(`${currentYear}`, 'YYYY').startOf('year');

    for (var i = 1; i <= 4; i++) {
      const option = {};

      if (date.isSame(moment(), 'quarter')) {
        option.current = true;
      }

      option.value = date.format('Q');
      option.label = `Quarter ${date.format('Q')}`;

      if (date.isBefore(minDate) || date.isAfter(maxDate)) {
        option.disabled = true;
      }

      options.push(option);

      date.add(1, 'quarter');
    }
    return options;
  }),
  yearOptions: computed('minDate', 'maxDate', function() {

    const minDate = get(this, 'minDate'),
      maxDate = get(this, 'maxDate'),
      year = moment(minDate),
      options = [];
    while (!year.isAfter(moment(maxDate), 'year')) {
      options.push(year.format('YYYY'));
      year.add(1, 'year');
    }
    return options;
  }),
  // Actions
  actions: {
    setQuarter(selected) {
      const action = get(this, 'onChange'),
        format = get(this, 'format'),
        quarter = get(selected, "value"),
        year = get(this, "year"),
        date = moment(`${year}-Q${quarter}`, 'YYYY-[Q]Q'),
        range = [
          startOfQuarter(date),
          endOfQuarter(date),
        ];

      if (action) {
        action(range, date.format(format));
      }
    },
    setYear(selected) {
      const action = get(this, 'onChange'),
        minDate = get(this, 'minDate'),
        maxDate = get(this, 'maxDate'),
        format = get(this, 'format'),
        quarter = get(this, "quarter"),
        year = selected;

      let date = moment(`${year}-W${quarter}`, 'YYYY-[Q]Q');

      // make sure the quarter selected is not outside the range
      if (date.isBefore(minDate)) {
        date = moment(minDate);
      } else if (date.isAfter(maxDate)) {
        date = moment(maxDate);
      }

      const range = [
        startOfQuarter(date),
        endOfQuarter(date),
      ];

      if (action) {
        action(range, date.format(format));
      }
    },
  },
});