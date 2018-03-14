import Component from '@ember/component';
import layout from '../templates/components/uxs-date-range';
import {
  set
} from '@ember/object';
import {
  equal
} from '@ember/object/computed';

export default Component.extend({
  // Attributes
  date: null,
  label: "Date Range",
  layout,
  type: null,
  // Computed
  isDateRange: equal('type', 'Date'),
  isWeekRange: equal('type', 'Week'),
  isMonthRange: equal('type', 'Month'),
  isQuarterRange: equal('type', 'Quarter'),
  isYearRange: equal('type', 'Year'),
  isCustomRange: equal('type', 'Custom'),
  // Methods
  init() {
    this._super(...arguments);
    set(this, 'date', new Date());
    set(this, 'from', new Date());
    set(this, 'to', new Date());
    set(this, 'rangeOptions', [
      'Date',
      'Week',
      'Month',
      'Quarter',
      'Year',
      'Custom',
    ]);
  },
});