import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  chapter: belongsTo('chapter'),
  options: hasMany('option'),
});
