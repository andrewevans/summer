import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      member: Ember.$.getJSON('/api/v1/members/1'),
    });
  }
});
