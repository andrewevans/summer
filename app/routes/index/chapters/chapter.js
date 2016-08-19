import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  paginationNav: Ember.inject.service('pagination-nav'),
  redirect(model) {
    var member = model.member,
      chapter = model.chapter,
      progresses = member.get('progresses'),
      chapter_progress = progresses.filterBy('chapter_id', chapter.id).objectAt(0); // Get first matching progress

    if (chapter_progress.status === 'unqualified') {

      // An 'unqualified' member goes directly to Results page
      this.transitionTo('index.chapters.chapter.results', chapter.id); // And go there
    } else if (chapter_progress.sequence_num) {

      // A non-null sequence number represents the last place visited was a question
      this.transitionTo('index.chapters.chapter.questions.question', chapter.id, chapter_progress.sequence_num); // And go there
    } else {

      // A null sequence number represents the last place visited was not a question
      this.transitionTo('index.chapters.chapter.welcome', chapter.id); // And go to welcome page
    }
  },
  afterModel(model) {
    var member = model.member,
      chapter = model.chapter,
      progresses = member.get('progresses'),
      chapter_progress = progresses.filterBy('chapter_id', chapter.id).objectAt(0), // Get first matching progress
      questions_promise = chapter.get('questions');

    questions_promise.then((questions) => {
      questions.forEach((parent_question) => {
        let child_questions = parent_question.get('questions'); // Get child questions

        if (child_questions.get('length')) {

          let child_question = child_questions.objectAt(0),
            tags = member.get('tags')
              .filterBy('chapterId', chapter.id)
              .filterBy('questionId', child_question.id),
            tag;

          // Find the corresponding tag, or create it if it doesn't exist yet
          if (tags.get('length')) {

            // The tag exists, so use it
            // @TODO: Support having more than one child question
            tag = tags.objectAt(0);
          } else {

            // The tag does not exist, so create it
            tag = this.get('store').createRecord('tag', {
              member: member,
              chapterId: chapter.id,
              questionId: child_question.id,
              answer: [],
            });
          }

          // Append child options to parent options
          parent_question.get('options').pushObjects(child_question.get('options'));
        }
      });
    });

    if (! chapter_progress) {

      // There is no progress marker for this chapter, so create one
      chapter_progress = { chapter_id: chapter.id, status: 'none', sequence_num: null};
      progresses.pushObject(chapter_progress); // Add progress marker to the member
    }
  },
  model(params) {
    Ember.Logger.log('in routes: chapter.js');

    var member = this.modelFor('index').member,
      chapter = this.modelFor('index/chapters').chapters
        .filterBy('id', params.id).objectAt(0);

    return Ember.RSVP.hash({
      member: member,
      chapter: chapter,

      // This is all the tags already received from the server plus the tags that were created from local storage, and
      // then filtered for only this chapter.
      tags: this.modelFor('index').tags.filterBy('chapterId', chapter.id),
    });
  },
  actions: {
    updateStatus(member, chapter, status) {
      Ember.Logger.log('Updating status here...');

      // status is an enum, so log a warning if something else is used
      if (['none', 'started', 'completed', 'unqualified'].indexOf(status) === -1) {
        Ember.Logger.warn('The member is being updated with an unsupported status of: ' + status);
      }

      var chapter_progress = member.get('progresses').filterBy('chapter_id', chapter.id).objectAt(0); // Get first matching progress

      chapter_progress.status = status; // Update progress marker's status flag as 'none', 'started', 'completed', or 'unqualified'
      member.save(); // Explicitly save member because status is not observable
    },
    restart(member, chapter) {
      Ember.Logger.log('Restarting chapter here...');

      var chapter_progress = member.get('progresses').filterBy('chapter_id', chapter.id).objectAt(0),
        chapter_tags;

      chapter_progress.status = 'none'; // Update progress marker's status flag as 'none'
      member.save(); // Explicitly save member because status is not observable

      chapter_tags = member.get('tags').filterBy('chapterId', chapter.id); // Get tags for this chapter

      chapter_tags.forEach(tag => {

        // Delete this tag's local storage
        this.set('storage.tag[' + member.id + '][' + chapter.id + '][' + tag.get('questionId') +']', null);

        tag.destroyRecord(); // Delete tag
      });

      this.transitionTo('index.chapters.chapter.welcome', chapter.id); // And go to welcome page
    },
  },
});
