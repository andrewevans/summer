import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  serialize: function(snapshot, options) {
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
