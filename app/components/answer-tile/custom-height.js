import Ember from 'ember';

export default Ember.Component.extend({
  option_feet: 0,
  option_inches: 0,
  didReceiveAttrs() {
    var question = this.get('question'),
      options = question.get('options'),
      tag = this.get('tag'),
      answer = parseInt(tag.get('answer').objectAt(0)) || '';

    options.forEach((option) => {

      //@TODO: Don't use the freeform 'text' property to evaluate which option this is
      // Create references to specific options so child components can reference them individually
      switch (option.get('text')) {
        case 'feet':
          if (typeof answer === 'number') {
            let feet = Math.floor(parseInt(answer) / 12);
            option.set('value', feet);
          } else {
            option.set('value', '');
          }
          this.set('option_feet', option);
          break;

        case 'inches':
          if (typeof answer === 'number') {
            let inches = parseInt(answer) % 12;
            option.set('value', inches);
          } else {
            option.set('value', '');
          }
          this.set('option_inches', option);
          break;

        default:
          Ember.Logger.warn("Cannot create reference to option, because its option text is not recognized.");
          break;
      }
    });
  },
  keyUp() {
    var question = this.get('question'),
      options = question.get('options'),
      feet,
      inches,
      total_inches;

    options.forEach((option) => {
      switch (option.get('text')) {
        case 'feet':
          this.set('option_feet', option);
          break;

        case 'inches':
          this.set('option_inches', option);
          break;

        default:
          Ember.Logger.warn("Cannot create reference to option, because its option text is not recognized.");
          break;
      }
    });

    feet = parseInt(this.get('option_feet').get('value')) || 0;
    inches = parseInt(this.get('option_inches').get('value')) || 0;

    total_inches = (feet * 12) + inches;

    this.sendAction('updateTagCustom', [total_inches]);
  }
});
