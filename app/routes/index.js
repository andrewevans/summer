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
      id: 1011,
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
      id: 1015,
      title: "What's Your Sex?",
      description: "",
      type: "select",
      options: [
        "Male",
        "Female",
      ],
      chapter: chapter,
    });

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
      id: 1004,
      title: "Are you pregnant or trying to get pregnant?",
      description: "",
      type: "select",
      options: [
        "Yes, I'm pregnant",
        "Yes, I'm trying to get pregnant",
        "No",
      ],
      chapter: chapter,
    });

    this.store.createRecord('question', {
      id: 1115,
      title: "Previous or current conditions",
      description: "",
      type: "select",
      options: [
        "Condition 01",
        "Condition 02",
        "Condition 03",
        "Condition 04",
        "Condition 05",
        "Condition 06",
        "Condition 07",
        "Condition 08",
        "Condition 09",
        "Condition 10",
        "Condition 11",
        "Condition 12",
        "Condition 13",
        "Condition 14",
        "Condition 15",
        "Condition 16",
        "Condition 17",
        "Condition 18",
        "Condition 19",
        "Condition 20",
      ],
      chapter: chapter,
    });

    this.store.createRecord('question', {
      id: 1116,
      title: "Are you expecting twins or more?",
      description: "",
      type: "select",
      options: [
        "Yes",
        "No",
        "I don't know",
      ],
      chapter: chapter,
    });

    this.store.createRecord('question', {
      id: 1117,
      title: "Are you expecting twins or more?",
      description: "",
      type: "select",
      options: [
        "Yes",
        "No",
        "I don't know",
      ],
      chapter: chapter,
    });

    this.store.createRecord('question', {
      id: 1118,
      title: "Now that you're pregnant, do you smoke cigarettes?",
      description: "",
      type: "select",
      options: [
        "1118XXXXXX",
        "1118YYYYYY",
      ],
      chapter: chapter,
    });

    this.store.createRecord('question', {
      id: 1119,
      title: "Now that you're pregnant, how often do you have a drink that contains alcohol?",
      description: "",
      type: "select",
      options: [
        "1119XXXX",
        "1119YYYYY",
      ],
      chapter: chapter,
    });

    this.store.createRecord('question', {
      id: 1120,
      title: "Now that you're pregnant, do you ever use recreational drugs or misuse prescription medication, such as pain drugs?",
      description: "",
      type: "select",
      options: [
        "1120XXXXX",
        "1120YYYYY",
      ],
      chapter: chapter,
    });

    this.store.createRecord('question', {
      id: 1121,
      title: "When were you born?",
      description: "",
      type: "select",
      options: [
        "1121SELECT FIELDS",
        "1121SELECT FIELDS2",
      ],
      chapter: chapter,
    });

    this.store.createRecord('question', {
      id: 1122,
      title: "How tall are you?",
      description: "",
      type: "select",
      options: [
        "1122SELECT FIELDS",
        "1122SELECT FIELDS2",
      ],
      chapter: chapter,
    });

    this.store.createRecord('question', {
      id: 1123,
      title: "How much did you weigh before you were pregnant?",
      description: "",
      type: "select",
      options: [
        "1123SELECT FIELDS",
        "1123SELECT FIELDS2",
      ],
      chapter: chapter,
    });

    this.store.createRecord('question', {
      id: 1124,
      title: "What is your ethnicity and/or ancestry?",
      description: "",
      type: "select",
      options: [
        "1124SELECT FIELDS",
        "1124SELECT FIELDS2",
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
