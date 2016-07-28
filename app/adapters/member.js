import JSONAPIAdapter from 'ember-data/adapters/json-api';

export default JSONAPIAdapter.extend({
  namespace: '/ws/ajax/v1', // summer app's external API prefix
  buildURL (modelName, id) {

    return this.namespace + '/members/' + id;
  },
});
