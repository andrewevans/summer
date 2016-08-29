import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  title: attr(),
  description: attr(), // Can have HTML, to use it don't escape tags on the template (e.g. On .hbs use "triple-slash" {{{}}})
  type: attr(),
  slug: attr(), // Unique string to allow a specific question to be referenced
  options: hasMany('option'),
  chapter: belongsTo('chapter'),
  questions: hasMany('question', { inverse: 'question' }), // Relationship to its child questions
  question: belongsTo('question', { inverse: 'questions' }), // Relationship to its parent question
});
