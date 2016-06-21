import Ember from 'ember';

export default Ember.Component.extend({
  didReceiveAttrs() {
    this.updateInputValue();
  },
  // updateInputValue() and component/answer-tile's updateSelecteds()
  // need to be maintained together, because they do the same task but for different inputs.
  updateInputValue() {
    var tag = this.get('tag'),
      option = this.get('option'),
      answer = tag.get('answer') || [];

      option.set('value', answer);
  },
  keyUp() {
    this.sendAction('updateTag');

    this.updateInputValue();
  }
});
