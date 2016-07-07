import Ember from 'ember';

export default Ember.Service.extend({
  calculate(member, chapter, consequence_links, route) {
      var tags = member.get('tags'),
      forwardToResults = false,
      consequences = [], //@TODO: Consequences shouldn't recalculate on every transition
      link;

    tags.forEach(function(tag) {
      var answer = tag.get('answer') || [],
        questionId = parseInt(tag.get('questionId'));

      //@TODO: This is business logic, doesn't belong here
      switch (questionId) {

        // Q: sex
        case 2:
          if (answer.contains('male')) {
            forwardToResults = true;
          }
          break;

        // Q: age
        case 3:
          if (answer.contains('13-')) {
            forwardToResults = true;
          }
          break;

        // Q: preg?
        case 4:
          if (answer.contains('none')) {
            forwardToResults = true;
          }
          break;

        // Q: live in US?
        case 1:
          if (answer.contains('no')) {
            forwardToResults = true;
          }
          break;

        // conditions
        case 5:
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
        case 6:
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
      route.transitionTo('index.chapter.results', chapter.id);
    }

    return;
  }
});
