import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('answer-tile/custom-extra', 'Integration | Component | answer tile/custom extra', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{answer-tile/custom-extra}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#answer-tile/custom-extra}}
      template block text
    {{/answer-tile/custom-extra}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
