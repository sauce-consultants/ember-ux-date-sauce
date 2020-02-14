import Component from '@ember/component';
import layout from '../../templates/components/uxs-date-range/week';
import {
  computed,
  get,
} from '@ember/object';
import moment from 'moment';

export default Component.extend({
  // Attributes
  layout,
  tagName: '',
  format: 'YYYY-[W]WW',
  minDate: moment.utc('2000', 'YYYY').startOf('year').toDate(),
  maxDate: moment.utc('2010', 'YYYY').endOf('year').toDate(),
  // Computed
  week: computed('value', 'format', function() {
    const value = get(this, 'value'),
      format = get(this, 'format');

    return moment.utc(value, format).format('WW');
  }),
  year: computed('value', 'format', function() {
    const value = get(this, 'value');
 
    return value.substring(0, value.indexOf("-"));
  }),
  weekOptions: computed('minDate', 'maxDate', 'year', function() {
    const minDate = get(this, 'minDate'),
      maxDate = get(this, 'maxDate'),
      currentYear = get(this, 'year'),
      options = [],
      date = moment.utc(`${currentYear}`, 'YYYY').startOf('year');

    for (var i = 1; i <= 52; i++) {
      const option = {};

      if (date.isSame(moment(), 'week')) {
        option.current = true;
      }

      option.value = date.format('WW');
      option.label = `Week ${date.format('WW')}`;

      if (date.isBefore(minDate) || date.isAfter(maxDate)) {
        option.disabled = true;
      }

      options.push(option);

      date.add(1, 'week');
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
    setWeek(selected) {
      const action = get(this, 'onChange'),
        format = get(this, 'format'),
        week = get(selected, "value"),
        year = get(this, "year"),
        date = moment(`${year}-W${week}`, 'YYYY-[W]WW'),
        range = [
          date.startOf('isoWeek').clone(),
          date.endOf('week').clone(),
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
        week = get(this, "week"),
        year = selected;

      let date = moment(`${year}-W${week}`, 'YYYY-[W]WW');

      // make sure the week selected is not outside the range
      if (date.isBefore(minDate)) {
        date = moment(minDate);
      } else if (date.isAfter(maxDate)) {
        date = moment(maxDate);
      }

      const range = [
        date.startOf('isoWeek').clone(),
        date.endOf('week').clone(),
      ];

      if (action) {
        action(range, date.format(format));
      }
    },
  },
});