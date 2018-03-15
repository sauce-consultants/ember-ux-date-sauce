import Component from '@ember/component';
import layout from '../../templates/components/uxs-date-range/year';
import {
  computed,
  get,
} from '@ember/object';
import moment from 'moment';

export default Component.extend({
  // Attributes
  layout,
  tagName: '',
  format: "YYYY",
  minDate: moment.utc('1970', 'YYYY').startOf('year').toDate(),
  maxDate: moment.utc().add(10, 'years').endOf('year').toDate(),
  // Computed
  year: computed('value', 'format', function() {
    const value = get(this, 'value'),
      format = get(this, 'format');

    return moment.utc(value, format).format('YYYY');
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
    setYear(selected) {
      const action = get(this, 'onChange'),
        minDate = get(this, 'minDate'),
        maxDate = get(this, 'maxDate'),
        format = get(this, 'format'),
        year = selected;

      let date = moment(year, 'YYYY');

      // make sure the week selected is not outside the range
      if (date.isBefore(minDate)) {
        date = moment(minDate);
      } else if (date.isAfter(maxDate)) {
        date = moment(maxDate);
      }

      const range = [
        date.startOf('year').clone(),
        date.endOf('year').clone(),
      ];

      if (action) {
        action(range, date.format(format));
      }
    },
  },
});