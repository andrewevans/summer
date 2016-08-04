import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('answer-tile/custom-height', 'Integration | Component | answer tile/custom height', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{answer-tile/custom-height}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#answer-tile/custom-height}}
      template block text
    {{/answer-tile/custom-height}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
