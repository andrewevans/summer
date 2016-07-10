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
    var chapter = this.modelFor('index/chapter').chapter,
      member = this.modelFor('index').member,
      progresses = member.get('progresses');

    progresses.forEach(progress => {
      if (progress.chapter_id === parseInt(chapter.id)) {
        progress.sequence_num = null; // Update member's current progress for this chapter

        /**
         * Pagination logic
         */
        var next = progress.sequence_num + 1,
          prev = progress.sequence_num - 1,
          total = chapter.get('questionsLength');

        next = (next > total ? false : next);
        prev = (prev < 1 ? false : prev);

        chapter.set('pagination', {
          'sequence_num': progress.sequence_num,
          'next': next,
          'prev': prev,
          'total': total,
          'percentageComplete': Math.floor(((progress.sequence_num - 1) / total) * 100),
        });
        /**
         * End pagination logic
         */
      }
    });

      return Ember.RSVP.hash({
      member: this.modelFor('index').member,
      chapter: chapter,
    });
  }
});
