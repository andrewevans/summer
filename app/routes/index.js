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
            title: 'Pregnancy Health Assessment',
            description: "We highly value your Bicycle rights next level heirloom, iPhone etsy artisan " +
            "church-key YOLO hammock offal pinterest meditation knausgaard authentic. Scenester roof party umami, " +
            "pop-up shabby chic fanny pack YOLO. Etsy actually mixtape kombucha yuccie, bicycle rights flannel venmo " +
            "pug dreamcatcher green juice kogi post-ironic sriracha. Shoreditch locavore chia crucifix gluten-free " +
            "trust fund.",
          }
        },
      ],
    });

    var chapter = this.store.peekRecord('chapter', 102);

    var question = this.store.createRecord('question', {
      id: 1116,
      title: "Are you expecting twins or more?",
      description: "",
      type: "select",
      chapter: chapter,
    });

    question.get('options').pushObject(
      this.store.createRecord('option', {
        value: "yes",
        text: "Yes",
      })
    );

    question.get('options').pushObject(
      this.store.createRecord('option', {
        value: "no",
        text: "No",
      })
    );

    question.get('options').pushObject(
      this.store.createRecord('option', {
        value: "i-dont-know",
        text: "I don't know",
      })
    );

    question = this.store.createRecord('question', {
      id: 1123,
      title: "How much did you weigh before you were pregnant?",
      description: "Be honest :)",
      type: "input",
      chapter: chapter,
    });

    question.get('options').pushObject(
      this.store.createRecord('option', {
        value: '', // This has no text property because it is for an input-type question
      })
    );

    question = this.store.createRecord('question', {
      id: 1011,
      title: "Do you live in the US?",
      description: "",
      type: "select",
      chapter: chapter,
    });

    question.get('options').pushObject(
      this.store.createRecord('option', {
        value: "yes",
        text: "Yes",
      })
    );

    question.get('options').pushObject(
      this.store.createRecord('option', {
        value: "no",
        text: "No",
      })
    );

    question = this.store.createRecord('question', {
      id: 1015,
      title: "What's Your Sex?",
      description: "",
      type: "select",
      chapter: chapter,
    });

    question.get('options').pushObject(
      this.store.createRecord('option', {
        value: "male",
        text: "Male",
      })
    );

    question.get('options').pushObject(
      this.store.createRecord('option', {
        value: "female",
        text: "Female",
      })
    );

    question = this.store.createRecord('question', {
      id: 1010,
      title: "How old are you?",
      description: "",
      type: "select",
      chapter: chapter,
    });

    question.get('options').pushObject(
      this.store.createRecord('option', {
        value: "13-",
        text: "13 or younger",
      })
    );

    question.get('options').pushObject(
      this.store.createRecord('option', {
        value: "14-17",
        text: "14-17",
      })
    );

    question.get('options').pushObject(
      this.store.createRecord('option', {
        value: "18-34",
        text: "18-34",
      })
    );

    question.get('options').pushObject(
      this.store.createRecord('option', {
        value: "35-44",
        text: "35-44",
      })
    );

    question.get('options').pushObject(
      this.store.createRecord('option', {
        value: "45+",
        text: "45 or older",
      })
    );

    question = this.store.createRecord('question', {
      id: 1004,
      title: "Are you pregnant or trying to get pregnant?",
      description: "",
      type: "select",
      chapter: chapter,
    });

    question.get('options').pushObject(
      this.store.createRecord('option', {
        value: "preg",
        text: "Yes, I'm pregnant",
      })
    );

    question.get('options').pushObject(
      this.store.createRecord('option', {
        value: "precon",
        text: "Yes, I'm trying to get pregnant",
      })
    );

    question.get('options').pushObject(
      this.store.createRecord('option', {
        value: "none",
        text: "No",
      })
    );

    question = this.store.createRecord('question', {
      id: 1115,
      title: "Previous or current conditions",
      description: "",
      type: "select-multi",
      chapter: chapter,
    });

    question.get('options').pushObject(
      this.store.createRecord('option', {
        value: "condition-01",
        text: "Condition 01",
      })
    );

    question.get('options').pushObject(
      this.store.createRecord('option', {
        value: "condition-02",
        text: "Condition 02",
      })
    );

    question.get('options').pushObject(
      this.store.createRecord('option', {
        value: "condition-03",
        text: "Condition 03",
      })
    );

    question.get('options').pushObject(
      this.store.createRecord('option', {
        value: "condition-04",
        text: "Condition 04",
      })
    );

    question.get('options').pushObject(
      this.store.createRecord('option', {
        value: "condition-05",
        text: "Condition 05",
      })
    );

    question.get('options').pushObject(
      this.store.createRecord('option', {
        value: "condition-A",
        text: "Condition A",
      })
    );

    question.get('options').pushObject(
      this.store.createRecord('option', {
        value: "condition-B",
        text: "Condition B",
      })
    );

    question.get('options').pushObject(
      this.store.createRecord('option', {
        value: "condition-C",
        text: "Condition C",
      })
    );

    question.get('options').pushObject(
      this.store.createRecord('option', {
        value: "condition-D",
        text: "Condition D",
      })
    );

    question.get('options').pushObject(
      this.store.createRecord('option', {
        value: "condition-E",
        text: "Condition E",
      })
    );

    question.get('options').pushObject(
      this.store.createRecord('option', {
        value: "condition-F",
        text: "Condition F",
      })
    );

    question.get('options').pushObject(
      this.store.createRecord('option', {
        value: "condition-G",
        text: "Condition G",
      })
    );
  }),
  model() {
    var consequence_links = [];

    consequence_links.pushObject({
      id: 1,
      text: "Read about Depression during pregnancy.",
      url: "http://www.babycenter.com/0_depression-during-pregnancy_9179.bc",
    });

    consequence_links.pushObject({
      id: 2,
      text: "Talk to pregnant women with pregestational type 1 or type 2 diabetes.",
      url: "http://community.babycenter.com/groups/a1636155",
    });

    consequence_links.pushObject({
      id: 3,
      text: "Read about gestational diabetes.",
      url: "http://www.babycenter.com/0_gestational-diabetes_2058.bc",
    });

    consequence_links.pushObject({
      id: 4,
      text: "Read about HIV and AIDS during pregnancy.",
      url: "http://www.babycenter.com/0_hiv-aids-during-pregnancy_1427384.bc",
    });

    consequence_links.pushObject({
      id: 5,
      text: "Read about chronic hypertension during pregnancy.",
      url: "http://www.babycenter.com/404_ive-been-diagnosed-with-hypertension-do-i-need-to-know-anyth_7079.bc",
    });

    consequence_links.pushObject({
      id: 6,
      text: "So There is Condition B? No problem.",
      url: "http://www.example.com",
    });

    consequence_links.pushObject({
      id: 7,
      text: "Condition C is C-Shell Sea Shore",
      url: "http://www.example.com",
    });

    consequence_links.pushObject({
      id: 8,
      text: "this is 8",
      url: "http://www.example.com",
    });

    consequence_links.pushObject({
      id: 9,
      text: "Learn how your prenatal care will change when you're carrying twins or other multiples.",
      url: "http://www.babycenter.com/0_pregnant-with-multiples-prenatal-care_3582.bc",
    });

    return Ember.RSVP.hash({
      member: this.store.findRecord('member', 4, { include: 'tags' }), // Get the member's record
      chapter: this.store.findRecord('chapter', 102, { include: 'questions' }),
      consequence_links: consequence_links,
      chapters: this.store.peekAll('chapter'),
    });

  }
});
