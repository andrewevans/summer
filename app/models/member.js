import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  username: attr(),
  consequences: attr(),
  progresses: attr(),
  pagination: attr(),
  tags: hasMany('tag'),
});
