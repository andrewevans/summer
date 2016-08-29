import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    Ember.Logger.log('in routes: questions.js');

    var chapter = this.modelFor('index/chapters/chapter').chapter;

    return Ember.RSVP.hash({
      questions: chapter.get('questions'),
    });
  },
});
