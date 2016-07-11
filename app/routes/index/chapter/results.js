import Ember from 'ember';

export default Ember.Route.extend({
  paginationNav: Ember.inject.service('pagination-nav'),
  afterModel(model) {
    var memberConsequences = this.get('member-consequences'),
      member = model.member,
      chapter = model.chapter,
      consequence_links = this.modelFor('index').consequence_links;

    memberConsequences.calculate(member, chapter, consequence_links, this);
  },
  model() {
    var chapter = this.modelFor('index/chapter').chapter,
      member = this.modelFor('index').member;

    // A null sequence_num represents the last question visited wasn't a question, but rather any other child route of
    // the index.chapter route.
    this.get('paginationNav').update(member, chapter, null); // Update pagination nav to null

      return Ember.RSVP.hash({
      member: this.modelFor('index').member,
      chapter: chapter,
    });
  }
});
