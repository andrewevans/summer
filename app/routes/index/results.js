import Ember from 'ember';

export default Ember.Route.extend({
  afterModel(model) {
    var member = model.member,
      chapter = model.chapter,
      tags = member.get('tags'),
      forwardToResults = false,
      consequences = [], //@TODO: Consequences shouldn't recalculate on every transition
      consequence_links = this.modelFor('index').consequence_links,
      link;

    var self = this;

    tags.forEach(function(tag) {
      var answer = tag.get('answer') || [],
        questionId = parseInt(tag.get('questionId'));

      //@TODO: This is business logic, doesn't belong here
      switch (questionId) {

        // Q: sex
        case 1015:
          if (answer.contains('male')) {
            forwardToResults = true;
          }
          break;

        // Q: age
        case 1010:
          if (answer.contains('13-')) {
            forwardToResults = true;
          }
          break;

        // Q: preg?
        case 1004:
          if (answer.contains('none')) {
            forwardToResults = true;
          }
          break;

        // Q: live in US?
        case 1011:
          if (answer.contains('no')) {
            forwardToResults = true;
          }
          break;

        case 1115:
          if (answer.contains('condition-B')) {
            link = consequence_links.objectAt(5);

            if (! consequences.contains(link)) {
              consequences.pushObject(link);
            }
          }

          if (answer.contains('condition-C')) {
            link = consequence_links.objectAt(6);

            if (! consequences.contains(link)) {
              consequences.pushObject(link);
            }
          }
          break;

        // Q: twins?
        case 1116:
          if (answer.contains('yes')) {
            link = consequence_links.objectAt(8);

            if (! consequences.contains(link)) {
              consequences.pushObject(link);
            }
          }
          break;

        default:
          break;
      }

      member.set('consequences', consequences);
    });

    if (forwardToResults) {
      self.transitionTo('index.results', chapter.id);
    }
  },
  model() {
    return Ember.RSVP.hash({
      member: this.modelFor('index').member,
      chapter: this.modelFor('index').chapter,
    });
  }
});
