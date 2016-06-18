import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    saveTags() {
      window.console.log("In pagination-nav saveTags()");
      this.sendAction('saveTags'); // Trigger the route's route-action
      return true; // Bubble saveTags action up to hit index/chapters route
    }
  }
});
