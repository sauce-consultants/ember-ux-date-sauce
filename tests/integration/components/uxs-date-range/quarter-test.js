import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('uxs-date-range/quarter', 'Integration | Component | uxs date range/quarter', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{uxs-date-range/quarter}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#uxs-date-range/quarter}}
      template block text
    {{/uxs-date-range/quarter}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
