import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    window.console.log('in routes/chapter.js');

    return Ember.RSVP.hash({
      member: this.modelFor('index').member,
      chapter: this.store.findRecord('chapter', parseInt(params.id), { include: 'questions, options' }),
    });

    // return this.store.find('chapter', params.id);    // Use this.store to query the mock database
  },
});
