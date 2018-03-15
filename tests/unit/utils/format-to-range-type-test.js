import formatToRangeType from 'dummy/utils/format-to-range-type';
import {
  module,
  test
} from 'qunit';

module('Unit | Utility | format to range type');

test('Detects day range', function(assert) {
  let result = formatToRangeType('12/12/19');
  assert.equal(result, 'Day');
});

test('Detects week range', function(assert) {
  let result = formatToRangeType('2019-W03');
  assert.equal(result, 'Week');
});

test('Detects month range', function(assert) {
  let result = formatToRangeType('1983-06');
  assert.equal(result, 'Month');
});

test('Detects quarter range', function(assert) {
  let result = formatToRangeType('2000-Q1');
  assert.equal(result, 'Quarter');
});

test('Detects year range', function(assert) {
  let result = formatToRangeType('2020');
  assert.equal(result, 'Year');
});

test('Detects custom range', function(assert) {
  let result = formatToRangeType('12/04/16..03/02/18');
  assert.equal(result, 'Custom');
});

test('Detects null range', function(assert) {
  let result = formatToRangeType(null);
  assert.equal(result, null);
});