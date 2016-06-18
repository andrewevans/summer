import Ember from 'ember';
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
  viewableQuestions: Ember.computed('pagination.sequence_num', function() {
    var viewableQuestions = [];

    //@TODO: This can only support a single index. This needs to check the value to see if it is a range
    viewableQuestions.pushObject(
      this.get('questions').objectAt(parseInt(this.get('pagination.sequence_num') -1))
    );

    return viewableQuestions;
  }),
});
