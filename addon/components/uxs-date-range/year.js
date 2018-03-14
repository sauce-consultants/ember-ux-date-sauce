import Component from '@ember/component';
import layout from '../../templates/components/uxs-date-range/year';
import {
  computed,
  set
} from '@ember/object';
import moment from 'moment';

export default Component.extend({
  // Attributes
  layout,
  year: null,
  // Computed
  yearOptions: computed(function() {
    const year = moment('2017', 'YYYY'),
      options = [];
    while (!year.isAfter(moment(), 'year')) {
      options.push(year.format('YYYY'));
      year.add(1, 'year');
    }
    return options;
  }),
  // Actions
  actions: {
    setYear(selected) {
      set(this, 'year', selected);
    },
  },
});