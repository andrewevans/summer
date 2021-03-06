import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  child_question: null,
  child_question_tag: null,
  didReceiveAttrs() {
    var member = this.get('member'),
      chapter = this.get('chapter'),
      parent_question = this.get('question'),

    // The parent question must have a child question to use the custom-extra component
      child_question = parent_question.get('questions').objectAt(0);

    // Find the tag corresponding to the child question
    let tags = member.get('tags')
      .filterBy('chapterId', chapter.id)
      .filterBy('questionId', child_question.id),
      tag;

    // Find the corresponding tag, or create it if it doesn't exist
    if (tags.get('length')) {

      // The tag exists, so use that one
      tag = tags.objectAt(0);
    } else {

      // The tag does not exist yet, so create it
      tag = this.get('store').createRecord('tag', {
        member: member,
        chapterId: chapter.id,
        questionId: child_question.id,
        answer: [],
      });
    }

    // Reorder options so that input is before the special options
    let options = parent_question.get('options'),
      index_input,
      index_first_special_option = null,
      option_input;

    options.forEach((option, i) => {
      if (option.get('text').indexOf('__input') === 0) {
        index_input = i; // Mark the position of the input option
        option_input = option; // Create reference to the input option
      }
    });

    options.removeAt(index_input); // Remove the input option from the options list

    options.forEach((option, i) => {
      if (option.get('value').indexOf('__none') === 0 && index_first_special_option === null) {
        index_first_special_option = i; // Mark the position of the first special option
      }
    });

    // Insert the input option immediately before the first special option
    options.insertAt(index_first_special_option, option_input);

    // Set the properties to be used in the template
    this.set('child_question_tag', tag);
    this.set('child_question', child_question);
  },
  saveTagWithSpecialCases: function(member, chapter, question, option, tag) {
    var answers = tag.get('answer') || [];

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

    this.sendAction('updateTagCustom', tag, answers);
  },
  actions: {
    saveTag(member, chapter, question, option, tag) {
      this.saveTagWithSpecialCases(member, chapter, question, option, tag);
    },
  },
});
