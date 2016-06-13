import Ember from 'ember';

export default Ember.Component.extend({
  isShowingResults: false,
  actions: {
    showResults() {
      this.toggleProperty('isShowingResults');
    },
    saveTags() {
      window.console.log("In results-list saveTags()");
      this.sendAction('saveTags');
      return true; // Bubble saveTags action up to hit index/chapters route
    }
  }
});
