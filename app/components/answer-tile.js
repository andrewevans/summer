import Ember from 'ember';

export default Ember.Component.extend({
  click() {
    // Send data about this answer to API

    this.sendAction('saveTag');
  }
});
