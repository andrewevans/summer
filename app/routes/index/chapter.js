import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    window.console.log('in routes/chapter.js');

    return Ember.RSVP.hash({
      member: this.modelFor('index').member,
      chapter: Ember.$.getJSON('/api/v1/chapters/' + params.id), // Use Ember.$.getJSON to request from endpoints
      questions: Ember.$.getJSON('/api/v1/chapters/' + params.id + '/questions')
    });

    // return this.store.find('chapter', params.id);    // Use this.store to query the mock database
  },
  actions: {
    saveTag() {
      alert("Tag saved");
    }
  }
});
