import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    var chapter = this.modelFor('index').chapter,
      sequence_num = parseInt(params.sequence_num),
      next = sequence_num + 1,
      prev = sequence_num - 1,
      total = chapter.get('questionsLength');

    next = (next > total ? false : next);
    prev = (prev < 1 ? false : prev);

    chapter.set('pagination', {
      'sequence_num': sequence_num,
      'next': next,
      'prev': prev,
      'total': total,
      'percentageComplete': (sequence_num/total) * 100,
    });

    return chapter;
  }
});
