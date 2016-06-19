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
      option = this.get('option');

    if (option.get('isSelected')) {
      // If it's already selected,
      // then reset this tag
      this.sendAction('clearTag'); //@TODO Only works for select-type questions. For select-multi, needs to search and remove
    } else {
      // Save/update this tag
      this.sendAction('saveTag');
    }

    // Update options' isSelected flags
    options.forEach(function(option) {
      //@TODO Direct quivalence only works for single select-type questions
      if (option.get('value') === tag.get('answer')) {
        if (option.get('isSelected')) {
          // If it's already selected,
          // then make it false
          option.set('isSelected', false);
        } else {
          // Flag this object as selected
          option.set('isSelected', true);
        }
      } else {
        //@TODO This only pertains to select-type single option questions
        option.set('isSelected', false);
      }
    });

    return true;
  }
});
