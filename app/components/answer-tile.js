import Ember from 'ember';

export default Ember.Component.extend({
  isSelected: false,
  click() {
    // Send data about this answer to API

    this.toggleProperty('isSelected');
    this.sendAction('saveTag');
  }
});
