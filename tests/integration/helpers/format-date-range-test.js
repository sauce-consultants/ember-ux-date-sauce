import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('format-date-range', 'helper:format-date-range', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '2020-Q1');

  this.render(hbs `{{format-date-range inputValue}}`);

  assert.equal(this.$().text().trim(), '1st Jan - 31st Dec 2020');
});