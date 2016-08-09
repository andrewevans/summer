import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  child_question: null,
  child_question_tag: null,
  didReceiveAttrs() {
    this.updateInputValue();
  },
  // updateInputValue() and component/answer-tile's updateSelecteds()
  // need to be maintained together, because they do the same task but for different inputs.
  updateInputValue() {
    var member = this.get('member'),
      chapter = this.get('chapter'),
      parent_question = this.get('question'),

    // The parent question must have a child question to use the custom-extra component
      child_question = parent_question.get('questions').objectAt(0);

    // Find the tag corresponding to the child question
    let tags = member.get('tags')
      .filterBy('chapterId', parseInt(chapter.id))
      .filterBy('questionId', parseInt(child_question.id)),
      tag;

    // Find the corresponding tag, or create it if it doesn't exist
    if (tags.get('length')) {

      // The tag exists, so use that one
      tag = tags.objectAt(0);
    } else {

      // The tag does not exist yet, so create it
      tag = this.get('store').createRecord('tag', {
        member: member,
        chapterId: parseInt(chapter.id),
        questionId: parseInt(child_question.id),
        answer: [],
      });
    }

    // Set the properties to be used in the template
    this.set('child_question_tag', tag);
    this.set('child_question', child_question);
  },
  saveTagWithSpecialCases: function(member, chapter, question, option, tag) {
    var answer = tag.get('answer') || [];

    option.set('value', answer);

    // Calculate BMI
    //@TODO: Don't do business logic here
    //@TODO: This only supports Imperial system
    var height_inches = 70; //@TODO: Hack to stub height until there is a relationship built to bring height into here
    var weight_pounds = parseInt(tag.get('answer').objectAt(0)) || 0;
    var bmi_value = Math.floor((weight_pounds * 703) / Math.pow(height_inches, 2));

    // Save BMI with updateTagCustom with child tag
    this.sendAction('updateTagCustom', this.get('child_question_tag'), [bmi_value]);
  },
  actions: {
    updateTag(member, chapter, question, option, tag) {
      // Save weight
      this.sendAction('updateTag', option, tag);

      this.saveTagWithSpecialCases(member, chapter, question, option, tag);
    },
  },
});
