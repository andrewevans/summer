import Ember from 'ember';

export default Ember.Service.extend({
  sessionStorage: Ember.inject.service('session'),
  /**
   * Pagination logic to update current state
   */
  update(member, chapter, sequence_num) {

    var progresses = member.get('progresses'),
      chapter_progress = progresses.filterBy('chapter_id', parseInt(chapter.id)).objectAt(0); // Get first matching progress

    if (chapter_progress) {
      chapter_progress.sequence_num = sequence_num; // Update member's current progress for this chapter

      // Update the ember-storage (localStorage or sessionStorage) value with the member's pagination
      this.get('sessionStorage').set('sequence_num[' + member.id + '][' + chapter.id + ']', chapter_progress.sequence_num);
    } else {

      // Get the localStorage sequence number if it exists, or null if it doesn't,
      // then create a new progress object using that value,
      // then add that new progress object to progresses.
      let sequence_num_local = parseInt(this.get('sessionStorage').get('sequence_num[' + member.id + '][' + chapter.id + ']')) || null,
        new_progress = { chapter_id: parseInt(chapter.id), sequence_num: parseInt(sequence_num_local)},
        chapter_progress_index = (progresses.push(new_progress) - 1); // Index of new progress

      // Create a reference to the new progress object, to be used in updating the pagination.
      chapter_progress = progresses[chapter_progress_index];
    }

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
