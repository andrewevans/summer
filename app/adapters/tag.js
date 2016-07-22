import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  namespace: '/ws/ajax/v1', // summer app's external API prefix
  buildURL (modelName, id, snapshot, requestType, query) {
    return this.namespace + '/responses';
  }
});
