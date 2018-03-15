import formatToRange from 'dummy/utils/format-to-range';
import {
  startOfQuarter,
  endOfQuarter
} from 'dummy/utils/moment-shims';
import {
  module,
  test
} from 'qunit';
import moment from 'moment';


module('Unit | Utility | format to range');

test('Converts day range', function(assert) {
  let string = '12/12/19',
    date = moment.utc(string, 'DD/MM/YYYY'),
    expectedFrom = date.startOf('day').clone(),
    expectedTo = date.endOf('day').clone(),
    result = formatToRange(string);

  assert.ok(expectedFrom.isSame(result[0], 'second'));
  assert.ok(expectedTo.isSame(result[1], 'second'));
});

test('Converts week range', function(assert) {
  let string = '2019-W03',
    date = moment.utc(string, 'YYYY-[W]WW'),
    expectedFrom = date.startOf('week').clone(),
    expectedTo = date.endOf('week').clone(),
    result = formatToRange(string);

  assert.ok(expectedFrom.isSame(result[0], 'second'));
  assert.ok(expectedTo.isSame(result[1], 'second'));
});

test('Converts month range', function(assert) {
  let string = '1983-06',
    date = moment.utc(string, 'YYYY-MM'),
    expectedFrom = date.startOf('month').clone(),
    expectedTo = date.endOf('month').clone(),
    result = formatToRange(string);

  assert.ok(expectedFrom.isSame(result[0], 'second'));
  assert.ok(expectedTo.isSame(result[1], 'second'));
});

test('Converts quarter range', function(assert) {
  let string = '2000-Q1',
    date = moment.utc(string, 'YYYY-[Q]Q'),
    expectedFrom = startOfQuarter(date),
    expectedTo = endOfQuarter(date),
    result = formatToRange(string);

  assert.ok(expectedFrom.isSame(result[0], 'second'));
  assert.ok(expectedTo.isSame(result[1], 'second'));
});

test('Converts year range', function(assert) {
  let string = '2020',
    date = moment.utc(string, 'YYYY'),
    expectedFrom = date.startOf('year').clone(),
    expectedTo = date.endOf('year').clone(),
    result = formatToRange(string);

  assert.ok(expectedFrom.isSame(result[0], 'second'));
  assert.ok(expectedTo.isSame(result[1], 'second'));
});

test('Converts custom range', function(assert) {
  let string = '12/04/16..03/02/18',
    dates = string.split('..'),
    expectedFrom = moment.utc(dates[0], 'DD/MM/YY').startOf('day'),
    expectedTo = moment.utc(dates[1], 'DD/MM/YY').endOf('day'),
    result = formatToRange(string);

  assert.ok(expectedFrom.isSame(result[0], 'second'));
  assert.ok(expectedTo.isSame(result[1], 'second'));
});

test('Converts null range', function(assert) {
  let result = formatToRange(null);
  assert.equal(result, null);
});