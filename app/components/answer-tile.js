import Ember from 'ember';

export default Ember.Component.extend({
  isSelected: Ember.computed('', function() {
    var option = this.get('option');

    return option.get('isSelected');
  }),
  click() {

    var question = this.get('question'),
      options = question.get('options'),
      tag = this.get('tag'),
      option = this.get('option'),
      answers;

    if (option.get('isSelected')) {
      // If it's already selected,
      // then reset this tag
      this.sendAction('clearTag'); //@TODO Only works for select-type questions. For select-multi, needs to search and remove
    } else {
      // Save/update this tag
      this.sendAction('saveTag');
    }

    answers = tag.get('answer');

    // Update options' isSelected flags
    options.forEach(function(option) {
      //@TODO Direct quivalence only works for single select-type questions
      if (answers.indexOf(option.get('value')) !== -1) {
        option.set('isSelected', true);
      } else {
        //@TODO This only pertains to select-type single option questions
        option.set('isSelected', false);
      }
    });

    return true;
  }
});
