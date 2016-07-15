import Ember from 'ember';

export default Ember.Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    var tag = this.get('tag');
    this.set('question_tag', tag);
  },
  question_tag: null, // The question's corresponding tag

  // A question is considered 'locked' if its corresponding tag is locked. A tag is considered 'locked' if its answer
  // is [null] .
  isLocked: Ember.computed('question_tag.answer', function() {
    var answer = this.get('question_tag.answer');

    return (answer.objectAt(0) === null ? true : false);
  }),
});
