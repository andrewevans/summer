import Ember from 'ember';

export default Ember.Component.extend({

  // A question is considered 'locked' if its corresponding tag is locked. A tag is considered 'locked' if its answer
  // is [null] .
  isLocked: Ember.computed('', function() {
    var tag = this.get('tag'),
      isLocked = false;

    if (tag.get('answer').objectAt(0) === null) {
      isLocked = true; // Set question as locked
    }

    return isLocked;
  }),
});
