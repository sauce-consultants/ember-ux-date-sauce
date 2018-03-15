import Controller from '@ember/controller';
import {
  set
} from '@ember/object';
import moment from 'moment';

export default Controller.extend({
  // Attributes
  value: '02/04/12..25/05/13',
  minDate: moment('2016-04-01').toDate(),
  maxDate: moment('2020-08-30').toDate(),
  // Actions
  actions: {
    setRange(range, format /*, ref*/ ) {
      set(this, 'value', format);
    },
  },
});