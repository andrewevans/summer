import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    Ember.Logger.log('in routes: chapter.js');

    var member = this.modelFor('index').member,
      chapter = this.modelFor('index/chapters').chapters
        .filterBy('id', params.id).objectAt(0);

    return Ember.RSVP.hash({
      chapter: chapter,

      // This is all the tags already received from the server plus the tags that were created from local storage, and
      // then filtered for only this chapter.
      tags: member.get('tags').filterBy('chapterId', chapter.id),
    });
  },
});
