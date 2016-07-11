import Ember from 'ember';

export default Ember.Route.extend({
  afterModel(model) {
    var member = model.member,
      chapter = model.chapter,
      progresses = member.get('progresses'),
      chapter_progress = progresses.filterBy('chapter_id', parseInt(chapter.id)).objectAt(0), // Get first matching progress
      hasProgress = false; // null because the progress marker for this chapter has not been found yet

    if (chapter_progress) {
      hasProgress = true;
      if (chapter_progress.sequence_num) {

        // A non-null sequence number represents the last place visited was a question
        this.transitionTo('index.chapter.question', chapter.id, chapter_progress.sequence_num); // And go there
      } else {

        // A null sequence number represents the last place visited was not a question
        this.transitionTo('index.chapter.welcome', chapter.id); // And go to welcome page
      }
    }
    // Check if current_progress has been discovered
    if (hasProgress === false) {

      // Set sequence number to null and go to welcome page
      progresses.push({ chapter_id: parseInt(chapter.id), sequence_num: null });
      this.transitionTo('index.chapter.welcome', chapter.id); // And go to welcome page
    }
  },
  model(params) {
    Ember.Logger.log('in routes/chapter.js');

    return Ember.RSVP.hash({
      member: this.modelFor('index').member,
      chapter: this.store.findRecord('chapter', parseInt(params.id), { include: 'questions, options' }),
    });
  },
});
