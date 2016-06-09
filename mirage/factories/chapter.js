import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  id(i) {
    return (200 + i);
  },
  title(i) {
    return `Chapter # ${i}`;
  },
  description: `Placeholder description here...`,
});
