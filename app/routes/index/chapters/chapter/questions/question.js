import Ember from 'ember';

export default Ember.Route.extend({
  paginationNav: Ember.inject.service('pagination-nav'),
  afterModel(model/*, transition*/) {
    var memberConsequences = this.get('member-consequences'),
      member = model.member,
      chapter = model.chapter,
      consequence_links = this.modelFor('index').consequence_links;

    memberConsequences.calculate(member, chapter, consequence_links, this);
  },
  model(params) {
    Ember.Logger.log('in routes: questions.js');

    var member = this.modelFor('index').member,
      sequence_num = parseInt(params.sequence_num),
      chapter = this.modelFor('index/chapters/chapter').chapter,
      questions = this.modelFor('index/chapters/chapter/questions').questions,

    // We don't know the ID of the current question yet,
    // just that it's nth question on the current chapter.
    // And hidden questions are ignored in this flow.
      question = questions
        .rejectBy('type', 'hidden')
        .objectAt(sequence_num - 1),

    // Get all of the chapter's tags
      tags = member.get('tags'),
      tag,

    // Filter tags to only get this question's tag
      question_tags = tags
        .filterBy('questionId', question.id);

    this.get('paginationNav').update(member, chapter, sequence_num); // Update pagination nav

    if (question_tags.get('length')) {

      // The tag exists, so use that one
      tag = question_tags.objectAt(0);

      // Update the ember-storage (localStorage or sessionStorage) value with tag value to keep them in sync
      // This is only necessary if the API brought in the tag, because if it did, it has not yet been entered into
      // localStorage yet. This may be handled by the API itself, but Mirage cannot yet utilize ember-storage.
      this.set('storage.tag[' + member.id + '][' + chapter.id + '][' + question.id +']', tag.get('answer'));
    } else {

      // The tag does not exist yet, so create it
      tag = this.store.createRecord('tag', {
        member: member,
        chapterId: chapter.id,
        questionId: question.id,
        answer: [],
      });
    }

    return Ember.RSVP.hash({
      member: member,
      chapter: chapter,
      viewable_questions: [question],
      tag: tag,
    });
  },
  actions: {
    resetTag(member, chapter, question, option, tag) {
      Ember.Logger.log("Resetting tag locally goes here...");

      var answers = [], // Create empty answer
        options = question.get('options');

      tag.set('answer', answers); // Reset tag

      if (tag.get('answer').objectAt(0) !== null) {
        tag.save(); // Persist data to API
      }

      // Set question's options to unselected
      options.forEach(option => {
        option.set('isSelected', false);
      });

      // In the case of a text input question, clear the first option's value
      if (question.get('type') === 'input') {
        options.objectAt(0).set('value', []);
      }

      // Delete local storage for this tag
      this.set('storage.tag[' + member.id + '][' + chapter.id + '][' + question.id +']', tag.get('answer'));
    },
    updateTagCustom(member, chapter, question, option, tag, custom_value) {
      Ember.Logger.log("Updating custom tag locally goes here...");

      tag.set('answer', custom_value);

      // Update the ember-storage (localStorage or sessionStorage) value with tag value to keep them in sync
      this.set('storage.tag[' + tag.get('member').get('id') + '][' + tag.get('chapterId') + '][' + tag.get('questionId') +']', tag.get('answer'));
    },
    updateTag(member, chapter, question, option, tag) {

      // Input fields use this to update the tag it's working on
      Ember.Logger.log("Updating tag locally goes here...");

      tag.set('answer', [option.get('value')]);

      // Update the ember-storage (localStorage or sessionStorage) value with tag value to keep them in sync
      this.set('storage.tag[' + member.id + '][' + chapter.id + '][' + question.id +']', tag.get('answer'));
    },
    saveTag(member, chapter, question, option, tag) {

      // We are passing member, chapter, question here even though we already have it
      // on the index route. This is to allow the rest of the app to create tags if needed.

      Ember.Logger.log("Saving tag locally goes here...");
      var answers = tag.get('answer') || [];

      // Reset a tag's answer if its value is [null] (which represents a locked tag). This is necessary for the case of
      // a select-multi question since it does not clear out the answer but instead adds to it. It must also be checked
      // that it is an object, because emberx-select has already assigned the tag's answer with a string (which is corrected
      // later on in this method.
      if (typeof answers === 'object' && answers.objectAt(0) === null) {
        answers = [];
      }

      // Question type affects how the tag is saved
      switch (question.get('type')) {

        case 'select':
          if (answers.indexOf(option.get('value')) !== -1) { // Is this option already in the answer?
            answers = []; // Clear the answer for single select-type questions
          } else {
            answers = []; // Clear the answer for single select-type questions

            answers.pushObject(option.get('value')); // Add option value to answer
          }
          break;

        case 'select-multi':
          answers = answers.slice(0); // Force answers to be a new array to trigger observers to notice the change
          if (answers.indexOf(option.get('value')) !== -1) { // Is this option already in the answer?
            answers.removeObject(option.get('value')); // Remove this specific answer from answers
          } else {

            //@TODO: Don't use hardcoded strings here. There should be a method that compares answers against rules
            answers.removeObjects(['__none-true', '__none-neutral']); // Remove special cases.

            if (option.get('value').indexOf('__none') === 0) { // Is this option one of the special cases that clears the answer?
              answers = []; // Clear the answer
            }

            answers.pushObject(option.get('value')); // Add option value to answer
          }
          break;

        case 'select-dropdown':

          // The tag's answer has already been updated by emberx-select. Therefore, we populate the answers with the
          // value that it had, but in array format.
          answers = []; // Clear the answer and turn it into an array since emberx-select updates the value as a string.

          answers.pushObject(tag.get('answer')); // Add option value to answer
          break;

        default:
          Ember.Logger.debug("This is an unsupported question-type.");
          break;
      }

      tag.set('answer', answers);

      // Update the ember-storage (localStorage or sessionStorage) value with tag value to keep them in sync
      this.set('storage.tag[' + member.id + '][' + chapter.id + '][' + question.id +']', tag.get('answer'));
      return true;
    },
    saveTags(member) {
      Ember.Logger.log("Saving all tags locally goes here...");

      //@TODO: member-consequences service does the tags loop with tag.save(), so this route action may no longer be needed.
    },
  }
});
