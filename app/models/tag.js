import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  questionId: attr(),
  answer: attr(),
  score: attr('number', { defaultValue: 0 }),
  chapterId: attr(),
  member: belongsTo(),
});
