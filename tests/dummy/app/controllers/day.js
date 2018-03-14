import Controller from '@ember/controller';
import {
  set
} from '@ember/object';

export default Controller.extend({
  // Attributes
  value: '16/04/2018',
  // Actions
  actions: {
    setRange(range, format /*, ref*/ ) {
      set(this, 'value', format);
    },
  },
});