import Controller from '@ember/controller';
import {
  set
} from '@ember/object';

export default Controller.extend({
  // Attributes
  from: '05/02/2018',
  to: '16/04/2018',
  // Actions
  actions: {
    setRange(range, /*format, ref*/ ) {
      set(this, 'from', range[0].format('DD/MM/YY'));
      set(this, 'to', range[1].format('DD/MM/YY'));
    },
  },
});