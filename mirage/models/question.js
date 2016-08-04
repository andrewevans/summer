import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  chapter: belongsTo('chapter'),
  options: hasMany('option'),
  questions: hasMany('question', { inverse: 'question' }),
  question: belongsTo('question', { inverse: 'questions' }),
});
