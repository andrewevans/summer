import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  title: attr(),
  description: attr(),
  questions: hasMany('question', {async: true}),
  questionsLength: Ember.computed('questions', function() {
    // A strange way to get the length of questions
    return this.hasMany('questions').ids().length;
  }),
  pagination: attr(), // Has nested pagination properties
});
