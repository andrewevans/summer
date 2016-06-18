import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    var chapter = this.modelFor('index').chapter,
      sequence_num = parseInt(params.sequence_num),
      next = sequence_num + 1,
      prev = sequence_num - 1,
      total = chapter.get('questionsLength');

    next = (next > total ? false : next);
    prev = (prev < 1 ? false : prev);

    chapter.set('pagination', {
      'sequence_num': sequence_num,
      'next': next,
      'prev': prev,
      'total': total,
      'percentageComplete': (sequence_num/total) * 100,
    });

    return chapter;
  },
  actions: {
    saveTag(member, chapter, question, option, optionIndex) {
      // We are passing member, chapter, question here even though we already have it
      // on the index route. This is to allow the rest of the app to create tags if needed.

      window.console.log("Saving tag locally goes here...");

      this.store.createRecord('tag', {
        member: member,
        chapterId: chapter.id,
        questionId: question.id,
        answer: option,
        answerIndex: optionIndex,
      });

      Ember.$.ajax({
        method: "POST",
        url: "/api/v1/responses",
        data: {
          memberId: member.id,
          chapterId: chapter.id,
          questionId: question.id,
          answer: option,
          answerIndex: optionIndex,
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
