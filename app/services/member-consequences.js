import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  sessionStorage: Ember.inject.service('session'),
  calculateBmi(member, chapter, tags) {

    // Get BMI option, if it exists
    //@TODO: Questions need a separate boolean property for 'hidden' so that hidden questions can also be referenced by their 'type'
    var bmi_option = this.get('store').peekAll('option').filterBy('text', '__input-bmi').objectAt(0);

    // Proceed to attempt to calculate BMI only if the BMI option exists
    if (bmi_option) {
      let bmi_question = bmi_option.get('question'),
        bmi_tag = this.get('store').peekAll('tag').filterBy('questionId', parseInt(bmi_question.get('id'))).objectAt(0),
        height_question = chapter.get('questions').filterBy('type', 'custom-height').objectAt(0), // Get custom height question's tag's answer
        height_tag = tags.filterBy('questionId', parseInt(height_question.id)).objectAt(0),
        height_value,
        weight_question = chapter.get('questions').filterBy('type', 'custom-weight').objectAt(0), // Get custom weight question
        weight_tag = tags.filterBy('questionId', parseInt(weight_question.id)).objectAt(0),
        weight_value;

      if (height_tag) {
        height_value = parseInt(height_tag.get('answer').objectAt(0));
      }

      if (weight_tag) {
        weight_value = parseInt(weight_tag.get('answer').objectAt(0));
      }

      if (! bmi_tag) {

        // The tag does not exist yet, so create it
        bmi_tag = this.get('store').createRecord('tag', {
          member: member,
          chapterId: parseInt(chapter.id),
          questionId: parseInt(bmi_question.get('id')),
          answer: [],
        });
      }

      // If both height and weight values are available, then set the BMI tag's answer
      if (height_value && weight_value) {

        // Calculate BMI
        //@TODO: Don't do business logic here
        //@TODO: This only supports Imperial system
        var bmi_value = Math.floor((weight_value * 703) / Math.pow(height_value, 2));

        bmi_tag.set('answer', [bmi_value]);
      } else {

        // The absence of a BMI value is represented by an empty array, similar to a skipped question's tag
        bmi_tag.set('answer', []);
      }

      //@TODO: Do all saving in the route actions to centralize where things are saved
      bmi_tag.save();

      // Update the ember-storage (localStorage or sessionStorage) value with tag value to keep them in sync
      // This is only necessary if the API brought in the tag, because if it did, it has not yet been entered into
      // localStorage yet. This may be handled by the API itself, but Mirage cannot yet utilize ember-storage.
      this.get('sessionStorage').set('tag[' + member.id + '][' + chapter.id + '][' + bmi_question.get('id') +']', bmi_tag.get('answer'));
    }
  },
  calculate(member, chapter, consequence_links, route) {

    var progresses = member.get('progresses'),
      chapter_progress = progresses.filterBy('chapter_id', parseInt(chapter.id)).objectAt(0); // Get first matching progress

    if (chapter_progress.status === 'unqualified') {

      // An 'unqualified' member goes directly to Results page
      route.transitionTo('index.chapter.results', chapter.id); // And go there
    }

    var tags = member.get('tags'),
      forwardToResults = false,
      consequences = [], //@TODO: Consequences shouldn't recalculate on every transition
      link;

    //@TODO: This is business logic, doesn't belong here
    // Add default links that every member sees regardless of answers
    link = consequence_links.objectAt(9);

    if (! consequences.contains(link)) {
      consequences.pushObject(link);
    }

    link = consequence_links.objectAt(10);

    if (! consequences.contains(link)) {
      consequences.pushObject(link);
    }

    link = consequence_links.objectAt(11);

    if (! consequences.contains(link)) {
      consequences.pushObject(link);
    }

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
    });

    this.calculateBmi(member, chapter, tags);

    member.set('consequences', consequences);
    member.save();

    if (forwardToResults) {

      let chapter_progress = member.get('progresses').filterBy('chapter_id', parseInt(chapter.id)).objectAt(0);
      chapter_progress.status = 'unqualified'; // Update progress marker's status flag as 'unqualified'
      member.save(); // Explicitly save member because status is not observable

      route.transitionTo('index.chapter.results', chapter.id);
    }

    return;
  }
});
