import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  title: attr(),
  description: attr(),
  type: attr(),
  options: hasMany('option'),
  chapter: belongsTo('chapter'),
  questions: hasMany('question', { inverse: 'question' }),
  question: belongsTo('question', { inverse: 'questions' }),
});
