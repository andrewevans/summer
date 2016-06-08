import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  title(i) {
    return `Chapter # ${i}`;
  },
  description: `Placeholder description here...`,
});
