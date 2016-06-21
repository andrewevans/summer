import Ember from 'ember';

export default Ember.Component.extend({
  didReceiveAttrs() {
    this.updateSelecteds();
  },
  isSelected: Ember.computed('', function() {
    var option = this.get('option');

    return option.get('isSelected');
  }),
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
  click() {
    this.sendAction('saveTag');

    this.updateSelecteds();
  }
});
