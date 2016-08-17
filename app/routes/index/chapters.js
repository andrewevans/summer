import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    Ember.Logger.log('in routes: chapters.js');

    return Ember.RSVP.hash({
      chapters: this.store.findAll('chapter', { include: 'questions, options' }),
    });
  },
});
