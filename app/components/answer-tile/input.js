import Ember from 'ember';

export default Ember.Component.extend({
  keyUp() {
    this.sendAction('updateTag');
  }
});
