import Ember from 'ember';

export default Ember.Component.extend({
  click(options) {
    // Send data about this answer to API
    $.ajax({
      method: "POST",
      url: "/api/v1/responses",
      data: {
        memberId: this.get('member').data.id,
        chapterId: this.get('chapter').data.id,
        questionId: this.get('question').id,
        option: this.get('option'),
      }
    });
  }
});
