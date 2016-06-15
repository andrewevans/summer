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
        }, {
          id: '102',
          type: 'chapter',
          attributes: {
            title: 'Pregnancy Health Assessment!!',
          }
        },
      ],
    });

    this.store.createRecord('question', {
      title: "How old are you?",
      description: "",
      type: "select",
      options: [
        "13 or younger",
        "14-17",
        "18-34",
        "35-44",
        "45 or older",
      ],
    });
    this.store.createRecord('question', {
      title: "What's Your Sex???",
      description: "",
      type: "select",
      options: [
        "Male",
        "Female",
      ],
    });
    this.store.createRecord('question', {
      title: "Do you live in the US?",
      description: "",
      type: "select",
      options: [
        "Yes",
        "No",
      ],
    });
    this.store.createRecord('question', {
      title: "What's Your Sex?",
      description: "",
      type: "select",
      options: [
        "Male",
        "Female",
      ],
    });
  }),
  model() {
    return Ember.RSVP.hash({
      member: this.store.peekRecord('member', 16),
      chapter: this.store.peekRecord('chapter', 102),
      questions: this.store.peekAll('question'), //@TODO: This returns ALL questions, but must only return a specific chapter's questions
    });

  }
});
