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
    var member = model.member,
      tags = model.tags;

    // Cycle through all localStorage data items
    for (let i = 0; i < localStorage.length; i++) {

      let key = localStorage.key(i);

      // Set tags according to localStorage, but don't overwrite an already existing tag because tags take precedence
      // over local storage.
      //@TODO: Set localStorage prefix and then reference it
      if (localStorage.key(i).indexOf('es__tag') === 0) {
        let tag_local = localStorage.key(i).split(/[[\]]{1,2}/), // Turn key string into an array
          chapterId = parseInt(tag_local[2]),
          questionId = parseInt(tag_local[3]);

        // Find the tag that this localStorage data item corresponds to, if it exists.
        var matching_tags = tags
          .filterBy('chapterId', parseInt(chapterId))
          .filterBy('questionId', parseInt(questionId));

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

      if (localStorage.key(i).indexOf('es__sequence_num') === 0){
        let sequence_nums_local = key.split(/[[\]]{1,2}/),
          chapterId = parseInt(sequence_nums_local[2]), // chapter ID of this progress marker
          sequence_num = localStorage.getItem(key), // sequence_num of this progress marker
          sequence_nums = member.get('progresses'); // member's progress markers

        // Check if this sequence_num already exists on the member
        if (! sequence_nums.filterBy('chapter_id', chapterId).get('length')) {

          // If it is not, add it to member's sequence_num
          sequence_nums.pushObject({ chapter_id: parseInt(chapterId), sequence_num: parseInt(sequence_num)});
        }
      }
    }

  },
  model() {
    return Ember.RSVP.hash({
      member: this.store.findRecord('member', 4), //@TODO: Get the member's tags using findRecord 'include'

      // This is all the tags on the server for this member
      tags: this.store.query('tag', { memberId: 4}), //@TODO: Get tags via the member's relationship
      consequence_links: this.store.findAll('consequenceLink'),
    });
  },
  actions: {
    closeSummer() {
      Ember.$('#summer-app').fadeOut(100); // Remove summer-app from DOM
    },
  },
});
