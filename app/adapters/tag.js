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

    //@TODO: Append URL with ID for deleteRecord once Solarium is ready for it

    return this.namespace + '/responses';
  },
  sendTag(store, type, data, url, verb) {

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
    var requestType = 'createRecord',
      url = this.buildURL(type.modelName, null, snapshot, requestType),
      data = this.serialize(snapshot, { includeId: true });

    return this.sendTag(store, type, data, url, 'POST');
  },
  updateRecord(store, type, snapshot) {
    var requestType = 'updateRecord',
      url = this.buildURL(type.modelName, null, snapshot, requestType),
      data = this.serialize(snapshot, { includeId: true });

    return this.sendTag(store, type, data, url, 'POST'); // Solarium cannot accept verb 'PATCH'
  },
  deleteRecord(store, type, snapshot) {
    var requestType = 'deleteRecord',
      url = this.buildURL(type.modelName, null, snapshot, requestType),
      data = this.serialize(snapshot, { includeId: true });

    //@TODO: Currently only supports one record at a time
    // "Deleting" a tag on the server is represented by updating the tag with a blank response and a score of 0
    data.questions[0].response = [].join();
    data.questions[0].score = 0;

    return this.sendTag(store, type, data, url, 'POST'); // Solarium cannot accept verb 'DELETE'
  },
});
