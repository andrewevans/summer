import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  title: attr(),
  description: attr(),
  questions: hasMany('question', {async: true}),
});
