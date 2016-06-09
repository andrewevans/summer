import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  title(i) {
    return `What is question ${i} ?`;
  },
  description: `Placeholder desc.`,
  type: `select`,
  options: [
    'Yes',
    'No',
    'I don\'t know',
  ],
});
