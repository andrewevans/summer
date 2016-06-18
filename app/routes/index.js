import Ember from 'ember';

export default Ember.Route.extend({
  mockData: Ember.on('init', function() {

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

    var chapter = this.store.peekRecord('chapter', 102);

    this.store.createRecord('question', {
      id: 1010,
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
      chapter: chapter,
    });
    this.store.createRecord('question', {
      id: 1011,
      title: "What is this?",
      description: "",
      type: "select",
      options: [
        "Something crazy",
        "Not much",
      ],
      chapter: chapter,
    });
    this.store.createRecord('question', {
      id: 1015,
      title: "What's Your Sex???",
      description: "",
      type: "select",
      options: [
        "Male",
        "Female",
      ],
      chapter: chapter,
    });
    this.store.createRecord('question', {
      id: 1004,
      title: "Do you live in the US?",
      description: "",
      type: "select",
      options: [
        "Yes",
        "No",
      ],
      chapter: chapter,
    });
    this.store.createRecord('question', {
      id: 1115,
      title: "What's the question all about if this is words?",
      description: "",
      type: "select",
      options: [
        "Male",
        "Female",
      ],
      chapter: chapter,
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
