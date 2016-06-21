import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      chapters: this.modelFor('index').chapters,
    });
  }
});
