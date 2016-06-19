import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  value: attr(),
  text: attr(),
  userInput: attr(),
  isSelected: attr('boolean', { default: false }),
  question: belongsTo('question'),
});
