import Ember from 'ember';
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
  sendTag(store, type, snapshot, requestType, verb) {
    var data = this.serialize(snapshot, { includeId: true }),
      url = this.buildURL(type.modelName, null, snapshot, requestType);

    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax({
        type: verb,
        url: url,
        headers: {
          'Content-Type':'application/json'
        },
        data: JSON.stringify(data)
      }).then(function(data) {
        Ember.run(null, resolve, data);
      }, function(jqXHR) {
        jqXHR.then = null; // tame jQuery's ill mannered promises
        Ember.run(null, reject, jqXHR);
      });
    });
  },
  createRecord(store, type, snapshot) {
    return this.sendTag(store, type, snapshot, 'createRecord', 'POST');
  },
  updateRecord(store, type, snapshot) {
    return this.sendTag(store, type, snapshot, 'updateRecord', 'POST');
  },
});
