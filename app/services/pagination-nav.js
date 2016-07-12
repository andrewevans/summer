import Ember from 'ember';

export default Ember.Service.extend({
  sessionStorage: Ember.inject.service('session'),
  /**
   * Pagination logic to update current state
   */
  update(member, chapter, sequence_num) {

    var progresses = member.get('progresses'),
      chapter_progress = progresses.filterBy('chapter_id', parseInt(chapter.id)).objectAt(0); // Get first matching progress

    // Update status according to current status and incoming sequence_num
    switch (chapter_progress.status) {
      case 'none':
        if (sequence_num !== null) {
          chapter_progress.status = 'started';
        }
        break;
    }

    chapter_progress.sequence_num = sequence_num; // Update member's current progress for this chapter

    // Update the ember-storage (localStorage or sessionStorage) value with the member's pagination
    this.get('sessionStorage').set('sequence_num[' + member.id + '][' + chapter.id + ']', chapter_progress.sequence_num);

    // Update pagination
    var next = chapter_progress.sequence_num + 1,
      prev = chapter_progress.sequence_num - 1,
      total = chapter.get('questionsLength');
    next = (next > total ? false : next);
    prev = (prev < 1 ? false : prev);
    member.set('pagination', {
      'sequence_num': chapter_progress.sequence_num,
      'next': next,
      'prev': prev,
      'total': total,
      'percentageComplete': Math.floor(((chapter_progress.sequence_num - 1) / total) * 100),
    });
  }
});
