import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    window.console.log('in routes/chapter.js');

    return Ember.RSVP.hash({
      member: this.modelFor('index'),
      chapter: Ember.$.getJSON('/api/v1/chapters/' + params.id), // Use Ember.$.getJSON to request from endpoints
      questions: Ember.$.getJSON('/api/v1/chapters/' + params.id + '/questions')
    });

    // return this.store.find('chapter', params.id);    // Use this.store to query the mock database
  },
  actions: {
    saveTag(member, chapter, question, option) {
      window.console.log("Saving tag locally goes here...");

      this.store.createRecord('tag', {
        member: member,
        chapterId: chapter.data.id,
        questionId: question.id,
        answer: option,
      });

      $.ajax({
        method: "POST",
        url: "/api/v1/responses",
        data: {
          memberId: member.id,
          chapterId: chapter.data.id,
          questionId: question.id,
          answer: option,
        }
      });
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

      $.ajax({
        method: "POST",
        url: "/api/v1/responses",
        data: { tags },
      });
    },
  }
});