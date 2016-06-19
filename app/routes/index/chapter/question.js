import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    var chapter = this.modelFor('index').chapter,
      member = this.modelFor('index').member,
      sequence_num = parseInt(params.sequence_num),
      next = sequence_num + 1,
      prev = sequence_num - 1,
      total = chapter.get('questionsLength'),
      tag;

    next = (next > total ? false : next);
    prev = (prev < 1 ? false : prev);

    chapter.set('pagination', {
      'sequence_num': sequence_num,
      'next': next,
      'prev': prev,
      'total': total,
      'percentageComplete': (sequence_num/total) * 100,
    });

    // We don't know the ID of the current question yet,
    // just that it's nth question on the current chapter.
    var question = chapter.get('questions').objectAt(sequence_num - 1);

    var tags = member.get('tags')
      .filterBy('chapterId', chapter.id)
      .filterBy('questionId', question.id);

    if (tags.get('length')) {
      // The tag exists, so use that one
      tag = tags.objectAt(0);
    } else {
      // The tag does not exist yet, so create it
      tag = this.store.createRecord('tag', {
        member: member,
        chapterId: chapter.id,
        questionId: question.id,
      });
    }

    return Ember.RSVP.hash({
      member: member,
      chapter: chapter,
      tag: tag,
    });
  },
  actions: {
    updateTag(member, chapter, question, option, tag) {
      // Input fields use this to update the tag it's working on
      window.console.log("Updating tag locally goes here...");

      tag.set('answer', option.get('value'));
    },
    saveTag(member, chapter, question, option, tag) {
      // We are passing member, chapter, question here even though we already have it
      // on the index route. This is to allow the rest of the app to create tags if needed.

      window.console.log("Saving tag locally goes here...");

      tag.setProperties({
        member: member,
        chapterId: chapter.id,
        questionId: question.id,
        answer: option.get("value"),
      });

      Ember.$.ajax({
        method: "POST",
        url: "/api/v1/responses",
        data: {
          memberId: member.id,
          chapterId: chapter.id,
          questionId: question.id,
          answer: option.get("value"),
        }
      });

      return true;
    },
    saveTags(member) {
      window.console.log("Saving all tags locally goes here...");

      var tags = [];
      member.get('tags').forEach(function(tag) {
        tags.push({
          memberId: member.id,
          chapterId: tag.get('chapterId'),
          questionId: tag.get('questionId'),
          answer: tag.get('answer'),
        });
      });

      Ember.$.ajax({
        method: "POST",
        url: "/api/v1/responses",
        data: { tags },
      });
    },
  },
});
