import Ember from 'ember';

export default Ember.Route.extend({
  redirect() {
    if (this.get('router.url') === '/') {

      // If given no chapter, use the first chapter found
      this.store.findAll('chapter').then(chapters => {
        this.transitionTo('index.chapters.chapter.welcome', chapters.objectAt(0).id);
      });
    }
  },
  afterModel(model) {
    var member = model.member,
      tags = model.tags,
      progresses = member.get('progresses'); // member's progress markers

    tags.forEach(function(tag) {
      tag.set('member', member); // Create tag/member relationship
    });

    // Cycle through all localStorage data items
    for (let i = 0; i < localStorage.length; i++) {

      let key = localStorage.key(i);

      // Set tags according to localStorage, but don't overwrite an already existing tag because tags take precedence
      // over local storage.
      //@TODO: Set localStorage prefix and then reference it
      if (localStorage.key(i).indexOf('es__tag') === 0) {
        let tag_local = localStorage.key(i).split(/[[\]]{1,2}/), // Turn key string into an array
          chapterId = tag_local[2],
          questionId = tag_local[3];

        // Find the tag that this localStorage data item corresponds to, if it exists.
        var matching_tags = tags
          .filterBy('chapterId', chapterId)
          .filterBy('questionId', questionId);

        // Only create the tag if it does not already exist.
        if (! matching_tags.get('length')) {
          let tag_new = this.store.createRecord('tag', {
            member: member,
            chapterId: chapterId,
            questionId: questionId,
            answer: this.get('storage.tag[' + member.id + '][' + chapterId + '][' + questionId +']'),
          });

          if (tag_new.get('answer').objectAt(0) !== null) {
            tag_new.save(); // Persist data to API (because it was not found on the server)
          }
        }
      }

      // Assign sequence numbers if the server hasn't already
      if (localStorage.key(i).indexOf('es__sequence_num') === 0){
        let sequence_nums_local = key.split(/[[\]]{1,2}/),
          chapterId = sequence_nums_local[2], // chapter ID of this progress marker
          sequence_num = localStorage.getItem(key); // sequence number of this progress marker

        for (let i = 0; i < progresses.length; i++) {

          // Only update a sequence number if it belongs to this chapter and it is not already set by the server
          if (progresses[i].chapter_id === chapterId && typeof progresses[i].sequence_num === 'undefined') {
            progresses[i].sequence_num = sequence_num;
          }
        }
      }

      // Assign number of answers set if the server hasn't already
      if (localStorage.key(i).indexOf('es__answers_set') === 0){
        let answers_set_local = key.split(/[[\]]{1,2}/),
          chapterId = answers_set_local[2], // chapter ID of this progress marker
          answers_set = localStorage.getItem(key); // number of answers that have already been set of this progress marker

        for (let i = 0; i < progresses.length; i++) {

          // Only update the number of answers that have already been set if it belongs to this chapter and it is not
          // already set by the server.
          if (progresses[i].chapter_id === chapterId && typeof progresses[i].answers_set === 'undefined') {
            progresses[i].answers_set = answers_set;
          }
        }
      }
    }
  },
  model() {
    return Ember.RSVP.hash({
      member: this.store.findRecord('member', '4'), //@TODO: Get the member's tags using findRecord 'include'

      // This is all the tags on the server for this member
      tags: this.store.query('tag', { memberId: '4'}), //@TODO: Get tags via the member's relationship
      consequence_links: this.store.findAll('consequenceLink'),
    });
  },
  actions: {
    closeSummer() {
      Ember.$('#summer-app').fadeOut(100); // Remove summer-app from DOM
    },
  },
});
