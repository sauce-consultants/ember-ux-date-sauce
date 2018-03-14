import Component from '@ember/component';
import layout from '../../templates/components/uxs-date-range/quarter';
import {
  computed,
  get,
  set
} from '@ember/object';
import moment from 'moment';

export default Component.extend({
  // Attributes
  layout,
  quarter: null,
  year: null,
  // Computed
  quarterOptions: computed(function() {
    const options = [];

    for (var i = 0; i < 4; i++) {
      options.push({
        value: i,
        label: `Quarter ${(i+1)}`,
      });
    }

    return options;
  }),
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
    setQuarter(selected) {
      const quarter = get(selected, "value");
      set(this, 'quarter', quarter);
    },
    setYear(selected) {
      set(this, 'year', selected);
    },
  },
});