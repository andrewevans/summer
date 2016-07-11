import Ember from 'ember';

export default Ember.Route.extend({
  afterModel(model) {
    var member = model.member,
      chapter = model.chapter,
      progresses = member.get('progresses');

    member.chapter_progress = false; // null because the progress marker for this chapter has not been found yet

    progresses.forEach(progress => {
      if (progress.chapter_id === parseInt(chapter.id)) {
        member.chapter_progress = true;

        // A null sequence number is the welcome page, so don't transition to a question
        if (progress.sequence_num) {
          this.transitionTo('index.chapter.question', chapter.id, progress.sequence_num); // And go there
        }
      }
    });

    // Check if current_progress has been discovered
    if (member.chapter_progress === false) {

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

    // return this.store.find('chapter', params.id);    // Use this.store to query the mock database
  },
});
