import Ember from 'ember';

export default Ember.Route.extend({
  mockData: Ember.on('init', function() {

    var self = this;
    Ember.$.getJSON('/api/v1/members/').then(function(json) {
      var data = json.data;
      for (var i = 0; i < data.length; i++) {
        self.store.push({
          data: {
            id: data[i].id,
            type: 'member',
            attributes: {
              username: data[i].attributes.username,
            }
          },
        });
      }
    });
    this.store.push({
      data: [
        {
          id: '16',
          type: 'member',
          attributes: {
            username: 'Coeur',
          }
        }, {
          id: '17',
          type: 'member',
          attributes: {
            username: 'delila',
          }
        },
        ]
      });
  }),
  model() {
    return this.store.peekRecord('member', 16);
  }
});
