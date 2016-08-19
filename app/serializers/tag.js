import DS from 'ember-data';

export default DS.JSONSerializer.extend({

  // Modify "response" objects to become "tag" objects.
  // Only used for 'query' requests, such as: this.store.query('tag', { memberId: 4, chapterId: 102 }) .
  normalizeQueryResponse(store, primaryModelClass, payload) {
    var tags = [],
      responses = payload.responses;

    responses.forEach(function(response) {
      tags.push({
        type: 'tag',
        id: response.id.toString(),
        attributes: {
          chapterId: response.surveyId.toString(),
          questionId: response.questions.questionId.toString(),
          answer: response.questions.response,
          questionNumber: -1,
        },
      });
    });

    return {
      data: tags,
    };
  },

  // Modify "tag" objects to become "response" objects.
  // Only used for sending data, such as: tag.save() .
  serialize: function(snapshot) {
    var json = {
      surveyId: snapshot.attr('chapterId'),
      questions: {
        questionId: snapshot.attr('questionId').toString(),
        questionNumber: -1, //@TODO: Not yet needed in summer-app
        response: snapshot.attr('answer'),
      },
    };

    return json;
  }
});
