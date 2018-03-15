import Component from '@ember/component';
import layout from '../templates/components/uxs-date-range';
import {
  get,
  set
} from '@ember/object';
import {
  equal
} from '@ember/object/computed';
import {
  isEmpty
} from '@ember/utils';
import moment from 'moment';
import {
  startOfQuarter,
  endOfQuarter
} from '../utils/moment-shims';

export default Component.extend({
  // Attributes
  value: null,
  label: "Date Range",
  layout,
  type: null,
  defaultDayFormat: 'DD/MM/YY',
  defaultWeekFormat: 'YYYY-[W]W',
  defaultMonthFormat: 'YYYY-MM',
  defaultQuarterFormat: 'YYYY-[Q]Q',
  defaultYearFormat: 'YYYY',
  defaultCustomFormat: 'DD/MM/YY',
  minDate: moment.utc('1970', 'YYYY').startOf('year').toDate(),
  maxDate: moment.utc().add(10, 'years').endOf('year').toDate(),
  // Computed
  isDayRange: equal('type', 'Day'),
  isWeekRange: equal('type', 'Week'),
  isMonthRange: equal('type', 'Month'),
  isQuarterRange: equal('type', 'Quarter'),
  isYearRange: equal('type', 'Year'),
  isCustomRange: equal('type', 'Custom'),
  // Methods
  init() {
    this._super(...arguments);
    set(this, 'rangeOptions', [
      'Day',
      'Week',
      'Month',
      'Quarter',
      'Year',
      'Custom',
    ]);
  },
  convertDateToFormat(date, type) {
    switch (type) {
      case 'Day':
        return date.format(get(this, 'defaultDayFormat'));
      case 'Week':
        return date.format(get(this, 'defaultWeekFormat'));
      case 'Month':
        return date.format(get(this, 'defaultMonthFormat'));
      case 'Quarter':
        return date.format(get(this, 'defaultQuarterFormat'));
      case 'Year':
        return date.format(get(this, 'defaultYearFormat'));
      case 'Custom':
        var from = date.format(get(this, 'defaultCustomFormat')),
          to = date.add(1, 'day').format(get(this, 'defaultCustomFormat'));
        return `${from}..${to}`;
    }
  },
  convertFormatToDate(formattedDate, type) {
    switch (type) {
      case 'Day':
        return moment.utc(formattedDate, get(this, 'defaultDayFormat'));
      case 'Week':
        return moment.utc(formattedDate, get(this, 'defaultWeekFormat'));
      case 'Month':
        return moment.utc(formattedDate, get(this, 'defaultMonthFormat'));
      case 'Quarter':
        return moment.utc(formattedDate, get(this, 'defaultQuarterFormat'));
      case 'Year':
        return moment.utc(formattedDate, get(this, 'defaultYearFormat'));
      case 'Custom':
        // get first date in range
        formattedDate = formattedDate.split('..')[0];
        return moment.utc(formattedDate, get(this, 'defaultCustomFormat'));
    }
  },
  convertDefaultDateToRange(date, type) {
    switch (type) {
      case 'Day':
        return [
          date.startOf('day').clone(),
          date.endOf('day').clone(),
        ];
      case 'Week':
        return [
          date.startOf('week').clone(),
          date.endOf('week').clone(),
        ];
      case 'Month':
        return [
          date.startOf('month').clone(),
          date.endOf('month').clone(),
        ];
      case 'Quarter':
        return [
          startOfQuarter(date),
          endOfQuarter(date),
        ];
      case 'Year':
        return [
          date.startOf('year').clone(),
          date.endOf('year').clone(),
        ];
      case 'Custom':
        return [
          date.startOf('day').clone(),
          date.endOf('day').clone(),
        ];
    }
  },
  // Actions
  actions: {
    setRangeType(type) {

      if (isEmpty(type)) {
        return this.send('setRange', null, null, null);
      }

      const currentType = get(this, 'type'),
        currentValue = get(this, 'value');

      let date;

      if (isEmpty(currentValue)) {
        date = moment();
      } else {
        date = this.convertFormatToDate(currentValue, currentType);
      }

      const format = this.convertDateToFormat(date, type),
        range = this.convertDefaultDateToRange(date, type);

      set(this, 'type', type);
      this.send('setRange', range, format, null);
    },
    setRange(dates, format, ref) {
      const action = get(this, 'onChange');
      if (action) {
        action(dates, format, ref);
      }
    }
  }
});