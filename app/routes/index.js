import Ember from 'ember';

export default Ember.Route.extend({
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
      consequence_links: consequence_links,
    });

  }
});
