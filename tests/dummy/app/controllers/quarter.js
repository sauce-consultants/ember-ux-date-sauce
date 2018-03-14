import Controller from '@ember/controller';
import {
  set
} from '@ember/object';
import moment from 'moment';

export default Controller.extend({
  // Attributes
  value: '2013-Q3',
  minDate: moment('2016-04-01').toDate(),
  maxDate: moment('2020-08-30').toDate(),
  // Actions
  actions: {
    setQuarter(range, format /*, ref*/ ) {
      Ember.Logger.log(format);
      Ember.Logger.log(range);
      set(this, 'value', format);
    },
  },
});