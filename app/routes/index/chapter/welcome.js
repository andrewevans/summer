import Ember from 'ember';

export default Ember.Route.extend({
  paginationNav: Ember.inject.service('pagination-nav'),
  beforeModel() {
    var member = this.modelFor('index/chapter').member,
      chapter = this.modelFor('index/chapter').chapter;

    // A null sequence_num represents the last question visited wasn't a question, but rather any other child route of
    // the index.chapter route.
    this.get('paginationNav').update(member, chapter, null); // Update pagination nav
  }
});
