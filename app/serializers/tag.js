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

    var member = snapshot.belongsTo('member'), // Get the member that the tag belongs to
      chapter_id = snapshot.attr('chapterId'),
      progress = member.attr('progresses').filterBy('chapter_id', chapter_id).objectAt(0),
      ended;

    // For Solarium use only; This does not affect summer-app in any way
    // Only send 'ended=true' flag if the member is in a state of 'completed' or 'unqualified'
    if (progress.status === 'completed' || progress.status === 'unqualified') {
      ended = true;
    }

    var json = {
      ended: ended,
      surveyId: parseInt(snapshot.attr('chapterId')),
      questions: [{
        questionId: snapshot.attr('questionId'),
        questionNumber: -1, //@TODO: Not yet needed in summer-app
        response: snapshot.attr('answer').join(), //@TODO: Revert back to an array once server is updated to accept an array
        score: snapshot.attr('score'),
      }],
    };

    return json;
  }
});
