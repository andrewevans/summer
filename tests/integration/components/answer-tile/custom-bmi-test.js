import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('answer-tile/custom-bmi', 'Integration | Component | answer tile/custom bmi', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{answer-tile/custom-bmi}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#answer-tile/custom-bmi}}
      template block text
    {{/answer-tile/custom-bmi}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
