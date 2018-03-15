import Component from '@ember/component';
import layout from '../../templates/components/uxs-date-range/month';
import {
  computed,
  get,
} from '@ember/object';
import moment from 'moment';

export default Component.extend({
  // Attributes
  layout,
  tagName: '',
  format: 'YYYY-MM',
  minDate: moment.utc('2000', 'YYYY').startOf('year').toDate(),
  maxDate: moment.utc('2010', 'YYYY').endOf('year').toDate(),
  // Computed
  month: computed('value', 'format', function() {
    const value = get(this, 'value'),
      format = get(this, 'format');

    return moment.utc(value, format).format('MM');
  }),
  year: computed('value', 'format', function() {
    const value = get(this, 'value'),
      format = get(this, 'format');

    return moment.utc(value, format).format('YYYY');
  }),
  monthOptions: computed('year', 'minDate', 'maxDate', function() {
    const minDate = get(this, 'minDate'),
      maxDate = get(this, 'maxDate'),
      currentYear = get(this, 'year'),
      options = [],
      date = moment.utc(`${currentYear}`, 'YYYY').startOf('year');

    for (var i = 0; i < 12; i++) {
      const option = {};

      option.value = date.format('MM');
      option.label = date.format('MMM');

      if (date.isBefore(minDate) || date.isAfter(maxDate)) {
        option.disabled = true;
      }

      options.push(option);

      date.add(1, 'month');
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
    setMonth(selected) {
      const action = get(this, 'onChange'),
        format = get(this, 'format'),
        month = get(selected, "value"),
        year = get(this, "year"),
        date = moment(`${year}-${month}`, 'YYYY-MM'),
        range = [
          date.startOf('month').clone(),
          date.endOf('month').clone(),
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
        month = get(this, "month"),
        year = selected;

      let date = moment(`${year}-${month}`, 'YYYY-MM');

      // make sure the week selected is not outside the range
      if (date.isBefore(minDate)) {
        date = moment(minDate);
      } else if (date.isAfter(maxDate)) {
        date = moment(maxDate);
      }

      const range = [
        date.startOf('month').clone(),
        date.endOf('month').clone(),
      ];

      if (action) {
        action(range, date.format(format));
      }
    },
  },
});