import Ember from 'ember';

export default Ember.Component.extend({
  isSelected: Ember.computed('', function() {
    var tag = this.get('tag'),
      option = this.get('option');

    if (option.get('value') === tag.get('answer')) {
      // This option's value matches the tag's answer,
      // so consider it selected.
      return true;
    }

    return false;
  }),
  click() {
    // Send data about this answer to API

    this.toggleProperty('isSelected');
    this.sendAction('saveTag');
  }
});
