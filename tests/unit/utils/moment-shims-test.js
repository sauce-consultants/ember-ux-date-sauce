import {
  startOfQuarter,
  endOfQuarter
} from 'dummy/utils/moment-shims';
import {
  module,
  test
} from 'qunit';
import moment from 'moment';

module('Unit | Utility | moment shims');

test('Jan to start of quarter', function(assert) {
  let result = startOfQuarter(moment('2018-01-04'));
  assert.ok(result.isSame(moment('2018-01-01 00:00:00'), 'second'));
});
test('Jan to end of quarter', function(assert) {
  let result = endOfQuarter(moment('2018-01-04'));
  assert.ok(result.isSame(moment('2018-03-31 23:59:59'), 'second'));
});

test('Feb to start of quarter', function(assert) {
  let result = startOfQuarter(moment('2018-02-28'));
  assert.ok(result.isSame(moment('2018-01-01 00:00:00'), 'second'));
});
test('Feb to end of quarter', function(assert) {
  let result = endOfQuarter(moment('2018-02-28'));
  assert.ok(result.isSame(moment('2018-03-31 23:59:59'), 'second'));
});

test('Mar to start of quarter', function(assert) {
  let result = startOfQuarter(moment('2018-03-30'));
  assert.ok(result.isSame(moment('2018-01-01 00:00:00'), 'second'));
});
test('Mar to end of quarter', function(assert) {
  let result = endOfQuarter(moment('2018-03-30'));
  assert.ok(result.isSame(moment('2018-03-31 23:59:59'), 'second'));
});

test('Jul to start of quarter', function(assert) {
  let result = startOfQuarter(moment('2018-07-28'));
  assert.ok(result.isSame(moment('2018-07-01 00:00:00'), 'second'));
});
test('Jul to end of quarter', function(assert) {
  let result = endOfQuarter(moment('2018-07-28'));
  assert.ok(result.isSame(moment('2018-09-30 23:59:59'), 'second'));
});

test('Aug to start of quarter', function(assert) {
  let result = startOfQuarter(moment('2018-08-30'));
  assert.ok(result.isSame(moment('2018-07-01 00:00:00'), 'second'));
});
test('Aug to end of quarter', function(assert) {
  let result = endOfQuarter(moment('2018-08-30'));
  assert.ok(result.isSame(moment('2018-09-30 23:59:59'), 'second'));
});

test('Sep to start of quarter', function(assert) {
  let result = startOfQuarter(moment('2018-09-04'));
  assert.ok(result.isSame(moment('2018-07-01 00:00:00'), 'second'));
});
test('Sep to end of quarter', function(assert) {
  let result = endOfQuarter(moment('2018-09-04'));
  assert.ok(result.isSame(moment('2018-09-30 23:59:59'), 'second'));
});