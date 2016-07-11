import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    if (this.get('router.url') === '/') {

      // If given no chapter, use the first chapter found
      this.store.findAll('chapter').then(chapters => {
        this.transitionTo('index.chapter.welcome', chapters.objectAt(0).id);
      });
    }
  },
  afterModel(model) {
    var member = model.member;

    // Cycle through all localStorage data items
    for (let i = 0; i < localStorage.length; i++) {

      // Set tags according to localStorage, but don't overwrite an already existing tag because tags take precedence
      // over local storage.
      //@TODO: Set localStorage prefix and then reference it
      if (localStorage.key(i).indexOf('es__tag') === 0) {
        let tag_local = localStorage.key(i).split(/[[\]]{1,2}/), // Turn key string into an array
          chapterId = parseInt(tag_local[2]),
          questionId = parseInt(tag_local[3]);

        // Find the tag that this localStorage data item corresponds to, if it exists.
        var tags = member.get('tags')
          .filterBy('chapterId', parseInt(chapterId))
          .filterBy('questionId', parseInt(questionId));

        // Only create the tag if it does not already exist.
        if (! tags.get('length')) {
          this.store.createRecord('tag', {
            member: member,
            chapterId: chapterId,
            questionId: questionId,
            answer: this.get('storage.tag[' + member.id + '][' + chapterId + '][' + questionId +']'),
          });
        }
      }
    }
  },
  model() {
    return Ember.RSVP.hash({
      member: this.store.findRecord('member', 4, { include: 'tags' }), // Get the member's record
      consequence_links: this.store.findAll('consequenceLink'),
    });
  }
});
