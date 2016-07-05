import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {

    // Reset pagination
    this.modelFor('index/chapter').chapter
      .set('pagination', null);
  }
});
