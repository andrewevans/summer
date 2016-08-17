import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    Ember.Logger.log('in routes: questions.js');

    var member = this.modelFor('index').member,
      sequence_num = parseInt(params.sequence_num),
      chapter = this.modelFor('index/chapters/chapter').chapter,
      questions = this.modelFor('index/chapters/chapter/questions').questions,

    // We don't know the ID of the current question yet,
    // just that it's nth question on the current chapter.
    // And hidden questions are ignored in this flow.
      question = questions
        .rejectBy('type', 'hidden')
        .objectAt(sequence_num - 1),

    // Get all of the chapter's tags
      tags = this.modelFor('index/chapters/chapter').tags,
      tag,

    // Filter tags to only get this question's tag
      question_tags = tags
        .filterBy('questionId', question.id);

    if (question_tags.get('length')) {

      // The tag exists, so use that one
      tag = question_tags.objectAt(0);

      // Update the ember-storage (localStorage or sessionStorage) value with tag value to keep them in sync
      // This is only necessary if the API brought in the tag, because if it did, it has not yet been entered into
      // localStorage yet. This may be handled by the API itself, but Mirage cannot yet utilize ember-storage.
      this.set('storage.tag[' + member.id + '][' + chapter.id + '][' + question.id +']', tag.get('answer'));
    } else {

      // The tag does not exist yet, so create it
      tag = this.store.createRecord('tag', {
        member: member,
        chapterId: chapter.id,
        questionId: question.id,
        answer: [],
      });
    }

    return Ember.RSVP.hash({
      member: member,
      chapter: chapter,
      viewable_questions: [question],
      tag: tag,
    });
  },
});
