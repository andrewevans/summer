// mirage/factories/author.js
import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  name(i) {
    return `Author ${i}`;
  },
  age: 20,
  admin: false,
});
