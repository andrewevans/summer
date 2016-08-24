import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  sessionStorage: Ember.inject.service('session'),
  calculatePreg35(member, chapter, tags) {

    // Get preg-35 question, if it exists
    var preg35_question = chapter.get('questions').filterBy('slug', 'preg-35').objectAt(0),
      age_question = chapter.get('questions').filterBy('slug', 'age').objectAt(0),
      firstpreg_question = chapter.get('questions').filterBy('slug', 'first-preg').objectAt(0);

    // All three questions must exist
    if (preg35_question && age_question && firstpreg_question) {

      let preg35_tag = tags.filterBy('questionId', preg35_question.get('id')).objectAt(0),
        age_tag = tags.filterBy('questionId', age_question.get('id')).objectAt(0),
        firstpreg_tag = tags.filterBy('questionId', firstpreg_question.get('id')).objectAt(0),
        age_value,
        firstpreg_value;

      // preg35 evaluation only needs to happen if both the age tag and the firstpreg tag exist
      if (age_tag && firstpreg_tag) {

        if (! preg35_tag) {

          // The tag does not exist yet, so create it
          preg35_tag = this.get('store').createRecord('tag', {
            member: member,
            chapterId: chapter.id,
            questionId: preg35_question.get('id'),
            answer: [],
          });
        }

        // Get age answer
        age_value = age_tag.get('answer').objectAt(0);

        // Get firstpreg answer
        firstpreg_value = firstpreg_tag.get('answer').objectAt(0);

        if ((age_value === '35-44' || age_value === '45+') && firstpreg_value === 'yes') {
          preg35_tag.set('answer', ['yes']);
        } else {
          preg35_tag.set('answer', []);
        }

        // Save the tag to local storage
        this.get('sessionStorage').set('tag[' + member.id + '][' + chapter.id + '][' + preg35_question.get('id') +']', preg35_tag.get('answer'));
      }
    }
  },
  calculateBmi(member, chapter, tags) {

    // Get BMI option, if it exists
    //@TODO: Questions need a separate boolean property for 'hidden' so that hidden questions can also be referenced by their 'type'
    var bmi_option = this.get('store').peekAll('option').filterBy('text', '__input-bmi').objectAt(0);

    // Proceed to attempt to calculate BMI only if the BMI option exists
    if (bmi_option) {
      let bmi_question = bmi_option.get('question'),
        bmi_tag = tags.filterBy('questionId', bmi_question.get('id')).objectAt(0),
        height_question = chapter.get('questions').filterBy('type', 'custom-height').objectAt(0), // Get custom height question's tag's answer
        height_tag = tags.filterBy('questionId', height_question.id).objectAt(0),
        height_value,
        weight_question = chapter.get('questions').filterBy('type', 'custom-weight').objectAt(0), // Get custom weight question
        weight_tag = tags.filterBy('questionId', weight_question.id).objectAt(0),
        weight_value;

      if (height_tag) {
        height_value = parseInt(height_tag.get('answer').objectAt(0));
      }

      if (weight_tag) {
        weight_value = parseInt(weight_tag.get('answer').objectAt(0));
      }

      if (! bmi_tag) {

        // The tag does not exist yet, so create it
        bmi_tag = this.get('store').createRecord('tag', {
          member: member,
          chapterId: chapter.id,
          questionId: bmi_question.get('id'),
          answer: [],
        });
      }

      bmi_tag.set('score', 0); // Tag resets to 0 score, and updates its score from business logic

      // If both height and weight values are available, then set the BMI tag's answer
      if (height_value && weight_value) {

        // Calculate BMI
        //@TODO: Don't do business logic here
        //@TODO: This only supports Imperial system
        var bmi_value = Math.floor((weight_value * 703) / Math.pow(height_value, 2));

        bmi_tag.set('answer', [bmi_value]);

        if (bmi_value > 26) {
          bmi_tag.set('score', 1);
        }
      } else {

        // The absence of a BMI value is represented by an empty array, similar to a skipped question's tag
        bmi_tag.set('answer', []);
      }

      //@TODO: Do all saving in the route actions to centralize where things are saved
      bmi_tag.save();

      // Update the ember-storage (localStorage or sessionStorage) value with tag value to keep them in sync
      // This is only necessary if the API brought in the tag, because if it did, it has not yet been entered into
      // localStorage yet. This may be handled by the API itself, but Mirage cannot yet utilize ember-storage.
      this.get('sessionStorage').set('tag[' + member.id + '][' + chapter.id + '][' + bmi_question.get('id') +']', bmi_tag.get('answer'));
    }
  },
  calculate(member, chapter, consequence_links, route) {

    var progresses = member.get('progresses'),
      chapter_progress = progresses.filterBy('chapter_id', chapter.id).objectAt(0), // Get first matching progress
      potentially_first_tag_sent = false;

    //@TODO: Only allow custom Solarium properties to be modified in the adapters and serializers
    // Potentially mark this loop of calculations of the tags as the first for the chapter. This will be used to evaluate
    // whether this loop caused the member to go from zero tags sent to more than zero tags sent.
    if (chapter_progress.answers_set === 0) {
      potentially_first_tag_sent = true;
    }

    // answers_set resets to 0, and updates +1 for each non-empty tag that belongs to a non-hidden question
    chapter_progress.answers_set = 0;

    if (chapter_progress.status === 'unqualified') {

      // An 'unqualified' member goes directly to Results page
      route.transitionTo('index.chapters.chapter.results', chapter.id); // And go there
    }

    var tags = member.get('tags'),
      forwardToResults = false,
      consequences = [], //@TODO: Consequences shouldn't recalculate on every transition
      link;

    //@TODO: This is business logic, doesn't belong here
    // Add default links that every member sees regardless of answers
    link = consequence_links.objectAt(9);

    if (! consequences.contains(link)) {
      consequences.pushObject(link);
    }

    link = consequence_links.objectAt(10);

    if (! consequences.contains(link)) {
      consequences.pushObject(link);
    }

    link = consequence_links.objectAt(11);

    if (! consequences.contains(link)) {
      consequences.pushObject(link);
    }

    tags.forEach(function(tag) {
      var answer = tag.get('answer') || [],
        questionId = tag.get('questionId'),
        question = chapter.get('questions').filterBy('id', questionId).objectAt(0);

      tag.set('score', 0); // Tag resets to 0 score, and updates its score from business logic

      if (tag.get('answer').get('length') !== 0 && question.get('type') !== 'hidden') {
        chapter_progress.answers_set++; // +1 to number of answers set thus far
      }

      //@TODO: This is business logic, doesn't belong here
      switch (question.get('slug')) {

        case 'live-usa':
          if (answer.contains('no')) {
            forwardToResults = true;
          }
          break;

        case 'preg-now':
          if (answer.contains('no')) {
            forwardToResults = true;
          }
          break;

        // Q: age
        case 'age':
          if (answer.contains('13-')) {
            forwardToResults = true;
          }

          if (answer.contains('14-17')) {
            tag.set('score', 1);
          }
          break;

        // Q: twins?
        case 'twins':
          if (answer.contains('yes')) {
            link = consequence_links.objectAt(8);

            if (! consequences.contains(link)) {
              consequences.pushObject(link);
            }

            tag.set('score', 1);
          }
          break;

        case 'past-preg':
          if (answer.contains('preeclampsia')) {
            tag.set('score', 1);
          }

          if (answer.contains('preterm-delivery')) {
            tag.set('score', 1);
          }

          if (answer.contains('preterm-labor')) {
            tag.set('score', 1);
          }

          if (answer.contains('postpartum-depression')) {
            tag.set('score', 1);
          }

          if (answer.contains('placenta')) {
            tag.set('score', 1);
          }
          break;

        case 'miscarriage':
          if (answer.contains('2+')) {
            tag.set('score', 1);
          }
          break;

        case 'current-conditions':
          let preg_conditions = [
            'Anxiety',
            'Asthma, severe (uncontrolled symptoms)',
            'Bleeding or clotting disorder',
            'Cardiovascular conditions (heart disease)',
            'Depression',
            'Diabetes (type 1 or 2)',
            'Epilepsy or another seizure disorder',
            'Group B streptococcus (GBS)',
            'Gestational diabetes',
            'Hepatitis or another liver disease',
            'Herpes',
            'HIV/AIDS',
            'Hypertension (high blood pressure)',
            'Kidney disease',
            'Lupus',
            'Placenta previa',
            'Preeclampsia, eclampsia, or HELLP syndrome',
            'Rh sensitization',
            'Rheumatoid arthritis',
            'Syphilis',
            'Sickle cell disease',
            'Thalassemia',
            'Thyroid disease',
            'Tuberculosis',
            'Urinary tract infections (frequent)',
          ];

          for (let i = 0; i < preg_conditions.length; i++) {
            if (answer.contains(preg_conditions[i].dasherize())) {
              tag.set('score', 1);
            }
          }
          break;

        case 'problems':
          let preg_problems = [
            'A baby with a diagnosed genetic abnormality or birth defect',
            'Morning sickness with significant weight loss',
            'Cervical insufficiency (when the cervix dilates before a baby is full-term)',
            'Premature rupture of membranes (PROM)',
            'Preterm labor',
            'Uterine abnormalities, such as fibroids or septate uterus',
            'Vaginal bleeding after 12 weeks gestation',
          ];

          for (let i = 0; i < preg_problems.length; i++) {
            if (answer.contains(preg_problems[i].dasherize())) {
              tag.set('score', 1);
            }
          }
          break;

        case 'preterm-meds':
          if (answer.contains('yes')) {
            tag.set('score', 1);
          }
          break;

        case 'smoking':
          let smoking = [
            'Yes, but I\'m thinking about quitting.',
            'Yes, and I don\'t plan to quit.',
          ];

          for (let i = 0; i < smoking.length; i++) {
            if (answer.contains(smoking[i].dasherize())) {
              tag.set('score', 1);
            }
          }
          break;

        case 'drugs':
          let drugs = [
            'Cocaine',
            'Heroin',
            'Marijuana',
            'Opioid pain medication, such as fentanyl, acetaminophen/hydrocodone, or oxycodone',
            'Other recreational drugs',
          ];

          for (let i = 0; i < drugs.length; i++) {
            if (answer.contains(drugs[i].dasherize())) {
              tag.set('score', 1);
            }
          }
          break;

        case 'alcohol':
          let alcohol = [
            'Nearly every day',
            'Three or four days a week',
            'Two days a week',
            'Once a month',
            'Less than once a month',
          ];

          for (let i = 0; i < alcohol.length; i++) {
            if (answer.contains(alcohol[i].dasherize())) {
              tag.set('score', 1);
            }
          }
          break;

        default:
          break;
      }
    });

    this.calculateBmi(member, chapter, tags);
    this.calculatePreg35(member, chapter, tags);

    member.set('consequences', consequences);

    //@TODO: Only allow custom Solarium properties to be modified in the adapters and serializers
    // The first set of tags will be sent to Solarium only if
    // 1) before these calculations were done, zero tags had been sent at that point, and
    // 2) the # of answers that have been set at this point is now more than zero.
    if (potentially_first_tag_sent === true && chapter_progress.answers_set > 0) {
      chapter_progress.first_tag_sent = true; // Represents that started=true must be added to the payload of saved tags
    }

    member.save();

    if (forwardToResults) {

      let chapter_progress = member.get('progresses').filterBy('chapter_id', chapter.id).objectAt(0);
      chapter_progress.status = 'unqualified'; // Update progress marker's status flag as 'unqualified'
      member.save(); // Explicitly save member because status is not observable

      route.transitionTo('index.chapters.chapter.results', chapter.id);
    }

    return;
  }
});
