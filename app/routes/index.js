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
  model() {
    return Ember.RSVP.hash({
      member: this.store.findRecord('member', 4, { include: 'tags' }), // Get the member's record
      consequence_links: this.store.findAll('consequenceLink'),
    });

  }
});
