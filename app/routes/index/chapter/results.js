import Ember from 'ember';

export default Ember.Route.extend({
  afterModel(model) {
    var memberConsequences = this.get('member-consequences'),
      member = model.member,
      chapter = model.chapter,
      consequence_links = this.modelFor('index').consequence_links;

    memberConsequences.calculate(member, chapter, consequence_links, this);
  },
  model() {
    return Ember.RSVP.hash({
      member: this.modelFor('index').member,
      chapter: this.modelFor('index/chapter').chapter,
    });
  }
});
