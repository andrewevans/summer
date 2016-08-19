import Ember from 'ember';

export default Ember.Route.extend({
  paginationNav: Ember.inject.service('pagination-nav'),
  beforeModel() {
    var member = this.modelFor('index').member,
      chapter = this.modelFor('index/chapters/chapter').chapter;

    // A null sequence_num represents the last question visited wasn't a question, but rather any other child route of
    // the index.chapter route.
    this.get('paginationNav').update(member, chapter, null); // Update pagination nav

    var progresses = member.get('progresses'),
      chapter_progress = progresses.filterBy('chapter_id', chapter.id).objectAt(0); // Get first matching progress

    if (chapter_progress.status === 'unqualified') {

      // An 'unqualified' member goes directly to Results page
      this.transitionTo('index.chapters.chapter.results', chapter.id); // And go there
    }
  },
  model() {
    Ember.Logger.log('in routes: welcome.js');

    return Ember.RSVP.hash({
      member: this.modelFor('index').member,
      chapter: this.modelFor('index/chapters/chapter').chapter,
    });
  },
});
