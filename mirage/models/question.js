import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  chapter: belongsTo('chapter'),
  options: hasMany('option'),
  questions: hasMany('question', { inverse: 'question' }), // Relationship to its child questions
  question: belongsTo('question', { inverse: 'questions' }), // Relationship to its parent question
});
