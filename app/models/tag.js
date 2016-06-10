import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  questionId: attr(),
  answer: attr(),
  chapterId: attr(),
  memberId: belongsTo(),
});
