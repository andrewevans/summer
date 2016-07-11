import Ember from 'ember';

export default Ember.Service.extend({
  /**
   * Pagination logic to update current state
   */
  update(member, chapter, progress, sequence_num) {
    progress.sequence_num = sequence_num; // Update member's current progress for this chapter

    var next = progress.sequence_num + 1,
      prev = progress.sequence_num - 1,
      total = chapter.get('questionsLength');

    next = (next > total ? false : next);
    prev = (prev < 1 ? false : prev);

    member.set('pagination', {
      'sequence_num': progress.sequence_num,
      'next': next,
      'prev': prev,
      'total': total,
      'percentageComplete': Math.floor(((progress.sequence_num - 1)/total) * 100),
    });
  }
});
