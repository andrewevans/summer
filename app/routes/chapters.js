import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.$.getJSON('/api/v1/chapters'); // Use Ember.$.getJSON to request from endpoints

    // return this.store.findAll('chapters');    // Use this.store to query the mock database
  }
});
