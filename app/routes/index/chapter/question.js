import Ember from 'ember';

export default Ember.Route.extend({
  afterModel(model/*, transition*/) {
    var memberConsequences = this.get('member-consequences'),
      member = model.member,
      chapter = model.chapter,
      consequence_links = this.modelFor('index').consequence_links;

    memberConsequences.calculate(member, chapter, consequence_links, this);
  },
  model(params) {
    var chapter = this.modelFor('index').chapter,
      member = this.modelFor('index').member,
      sequence_num = parseInt(params.sequence_num),
      next = sequence_num + 1,
      prev = sequence_num - 1,
      total = chapter.get('questionsLength'),
      tag;

    next = (next > total ? false : next);
    prev = (prev < 1 ? false : prev);

    chapter.set('pagination', {
      'sequence_num': sequence_num,
      'next': next,
      'prev': prev,
      'total': total,
      'percentageComplete': Math.floor(((sequence_num-1)/total) * 100),
    });

    // We don't know the ID of the current question yet,
    // just that it's nth question on the current chapter.
    var question = chapter.get('questions').objectAt(sequence_num - 1);

    var tags = member.get('tags')
      .filterBy('chapterId', parseInt(chapter.id))
      .filterBy('questionId', parseInt(question.id));

    if (tags.get('length')) {
      // The tag exists, so use that one
      tag = tags.objectAt(0);
      // Update the ember-storage (localStorage or sessionStorage) value with tag value to keep them in sync
      this.set('storage.tag[' + member.id + '][' + chapter.id + '][' + question.id +']', tag.get('answer'));
    } else {
      // The tag does not exist yet, so create it
      tag = this.store.createRecord('tag', {
        member: member,
        chapterId: parseInt(chapter.id),
        questionId: parseInt(question.id),
        answer: [],
      });

      var storage_tag = this.get('storage.tag[' + member.id + '][' + chapter.id + '][' + question.id +']');

      if (storage_tag) {
        tag.set('answer', storage_tag);
      }
    }

    return Ember.RSVP.hash({
      member: member,
      chapter: chapter,
      tag: tag,
    });
  },
  actions: {
    updateTag(member, chapter, question, option, tag) {
      // Input fields use this to update the tag it's working on
      window.console.log("Updating tag locally goes here...");

      tag.set('answer', [option.get('value')]);

      // Update the ember-storage (localStorage or sessionStorage) value with tag value to keep them in sync
      this.set('storage.tag[' + member.id + '][' + chapter.id + '][' + question.id +']', tag.get('answer'));
    },
    saveTag(member, chapter, question, option, tag) {
      // We are passing member, chapter, question here even though we already have it
      // on the index route. This is to allow the rest of the app to create tags if needed.

      window.console.log("Saving tag locally goes here...");
      var answers = tag.get('answer') || [];

      // Question type affects how the tag is saved
      switch (question.get('type')) {

        case 'select':
          if (answers.indexOf(option.get('value')) !== -1) { // Is this option already in the answer?
            answers = []; // Clear the answer for single select-type questions
          } else {
            answers = []; // Clear the answer for single select-type questions

            answers.pushObject(option.get('value')); // Add option value to answer
          }
          break;

        case 'select-multi':
          if (answers.indexOf(option.get('value')) !== -1) { // Is this option already in the answer?
            answers.removeObject(option.get('value')); // Remove this specific answer from answers
          } else {
            answers.pushObject(option.get('value')); // Add option value to answer
          }
          break;

        case 'select-dropdown':
          // There is no need to populate the answer as it has already been updated by emberx-select.
          // Calling 'saveTag' for select-dropdown type of questions, so far, only updates the local storage value.
          break;

        default:
          Ember.Logger.debug("This is an unsupported question-type.");
          break;
      }

      tag.set('answer', answers);

      // Update the ember-storage (localStorage or sessionStorage) value with tag value to keep them in sync
      this.set('storage.tag[' + member.id + '][' + chapter.id + '][' + question.id +']', tag.get('answer'));

      Ember.$.ajax({
        method: "POST",
        url: "/api/v1/responses",
        contentType: "application/json",
        data: JSON.stringify({
          memberId: member.id,
          chapterId: chapter.id,
          questionId: question.id,
          answer: answers,
        })
      });

      Ember.$.ajax({
        type: "POST",
        data: JSON.stringify({
          memberId: member.id, //@TODO: Member ID should not be sent over http
          surveyId: chapter.id,
          questions: [
            {
              "questionId": question.id,
              "questionNumber": -1,
              "response": answers.toString()
            }
          ]
        }),
        contentType: "application/json",
        url: "/ws/ajax/v1/responses",
      });

      return true;
    },
    saveTags(member) {
      window.console.log("Saving all tags locally goes here...");

      var tags = [];
      member.get('tags').forEach(function(tag) {
        tags.push({
          memberId: member.id,
          chapterId: tag.get('chapterId'),
          questionId: tag.get('questionId'),
          answer: tag.get('answer'),
        });
      });

      var tags_alt,
        questions_alt = [],
        chapter_id_alt = -1; //@TODO: Due to the way the API receives data, this has to be extracted, but this assumes all of them are from the same chapter

      member.get('tags').forEach(function(tag) {
        chapter_id_alt = tag.get('chapterId'); //@TODO: Always assigns to last tag in the list

        questions_alt.push({
          "questionId": tag.get('questionId'),
          "questionNumber": -1, //@TODO: Question number not yet needed, but it is required by API
          "response": tag.get('answer').toString()
        });
      });

      tags_alt = {
        memberId: member.id, //@TODO: Member ID should not be sent over http
        surveyId: chapter_id_alt,
        questions: questions_alt
      };

      Ember.$.ajax({
        method: "POST",
        contentType: "application/json",
        url: "/ws/ajax/v1/responses",
        data: JSON.stringify(tags_alt),
      });
    },
  },
});
