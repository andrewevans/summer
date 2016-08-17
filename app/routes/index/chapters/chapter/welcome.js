import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    Ember.Logger.log('in routes: welcome.js');

    return Ember.RSVP.hash({
      member: this.modelFor('index').member,
      chapter: this.modelFor('index/chapters/chapter').chapter,
    });
  },
});
