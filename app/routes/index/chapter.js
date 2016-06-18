import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    window.console.log('in routes/chapter.js');

    return Ember.RSVP.hash({
      member: this.modelFor('index').member,
      chapter: this.modelFor('index').chapter, // Use Ember.$.getJSON to request from endpoints
    });

    // return this.store.find('chapter', params.id);    // Use this.store to query the mock database
  },
});
