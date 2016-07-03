import Ember from 'ember';

export default Ember.Component.extend({
  didReceiveAttrs() {
    this.updateSelecteds();
  },
  isSelected: Ember.computed('', function() {
    var option = this.get('option');

    return option.get('isSelected');
  }),
  // updateSelecteds() and component/answer-tile's updateInputValue()
  // need to be maintained together, because they do the same task but for different inputs.
  updateSelecteds: function() {
    var question = this.get('question'),
      options = question.get('options'),
      tag = this.get('tag'),
      answers;

    answers = tag.get('answer') || [];

    options.forEach(function(option) {
      if (answers.indexOf(option.get('value')) !== -1) {
        option.set('isSelected', true);
      } else {
        option.set('isSelected', false);
      }
    });
  },
  actions: {
    // Triggered when the x-select element is clicked
    selectOption() {

      // This 'saveTag' will behave differently as the others as emberx-select has already updated the tag to the
      // selected option's value
      this.sendAction('saveTag');

      this.updateSelecteds();
    }
  }
});
