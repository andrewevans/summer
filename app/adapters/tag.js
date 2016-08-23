import JSONAPIAdapter from 'ember-data/adapters/json-api';

export default JSONAPIAdapter.extend({
  namespace: '/ws/ajax/v1/loggedin', // summer app's external API prefix
  buildURL (modelName, id, snapshot, requestType, query) {

    // Solarium API translation
    if (query && query.chapterId) {
      query.surveyId = query.chapterId;
      delete query.chapterId;
    }

    if (requestType === 'deleteRecord') {
      return this.namespace + '/responses/' + id;
    }

    return this.namespace + '/responses';
  },
});
