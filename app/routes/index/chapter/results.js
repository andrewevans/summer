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
      member = this.modelFor('index').member,
      progresses = member.get('progresses');

    progresses.forEach(progress => {
      if (progress.chapter_id === parseInt(chapter.id)) {
        this.get('paginationNav').update(chapter, progress, null); // Update pagination nav to null
      }
    });

      return Ember.RSVP.hash({
      member: this.modelFor('index').member,
      chapter: chapter,
    });
  }
});