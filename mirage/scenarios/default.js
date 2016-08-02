export default function(server) {

  server.loadFixtures();

  let member = server.schema.members.find(4); // Get member "lana"

  server.create('response', {
    memberId: 4,
    surveyId: 102,
    questions: {
      questionId: 11,
      questionNumber: -1,
      response: ['127'],
    },
  });

  server.create('response', {
    memberId: 4,
    surveyId: 102,
    questions: {
      questionId: 3,
      questionNumber: -1,
      response: ['18-34'],
    },
  });

  server.create('response', {
    memberId: 4,
    surveyId: 102,
    questions: {
      questionId: 4,
      questionNumber: -1,
      response: [null],
    },
  });

  let chapter = server.schema.chapters.find(102);

  let question;

  // Create a question + its options
  question = chapter.createQuestion({
    title: "Do you live in the US?",
    description: "",
    type: "select",
  });

  question.createOption({
    value: "yes",
    text: "Yes",
  })

  question.createOption({
    value: "no",
    text: "No",
  });
  // End question + its options

  // Create a question + its options
  question = chapter.createQuestion({
    title: "What's Your Sex?",
    description: "",
    type: "select",
  });

  question.createOption({
    value: "male",
    text: "Male",
  });

  question.createOption({
    value: "female",
    text: "Female",
  });
  // End question + its options

  // Create a question + its options
  question = chapter.createQuestion({
    title: "How old are you?",
    description: "",
    type: "select",
  });

  question.createOption({
    value: "13-",
    text: "13 or younger",
  });

  question.createOption({
    value: "14-17",
    text: "14-17",
  });

  question.createOption({
    value: "18-34",
    text: "18-34",
  });

  question.createOption({
    value: "35-44",
    text: "35-44",
  });

  question.createOption({
    value: "45+",
    text: "45 or older",
  });
  // End question + its options

  // Create a question + its options
  question = chapter.createQuestion({
    title: "Are you pregnant or trying to get pregnant?",
    description: "",
    type: "select",
  });

  question.createOption({
    value: "preg",
    text: "Yes, I'm pregnant",
  });

  question.createOption({
    value: "precon",
    text: "Yes, I'm trying to get pregnant",
  });

  question.createOption({
    value: "none",
    text: "No",
  });
  // End question + its options

  // Create a question + its options
  question = chapter.createQuestion({
    title: "Previous or current conditions",
    description: "",
    type: "select-multi",
  });

  question.createOption({
    value: "condition-01",
    text: "Condition 01",
  });

  question.createOption({
    value: "condition-02",
    text: "Condition 02",
  });

  question.createOption({
    value: "condition-03",
    text: "Condition 03",
  });

  question.createOption({
    value: "condition-04",
    text: "Condition 04",
  });

  question.createOption({
    value: "condition-05",
    text: "Condition 05",
  });

  question.createOption({
    value: "condition-A",
    text: "Condition A",
  });

  question.createOption({
    value: "condition-B",
    text: "Condition B",
  });

  question.createOption({
    value: "condition-C",
    text: "Condition C",
  });

  question.createOption({
    value: "condition-D",
    text: "Condition D",
  });

  question.createOption({
    value: "condition-E",
    text: "Condition E",
  });

  question.createOption({
    value: "condition-F",
    text: "Condition F",
  });

  question.createOption({
    value: "condition-G",
    text: "Condition G",
  });

  question.createOption({
    value: "__none-true",
    text: "None of the above",
  });

  question.createOption({
    value: "__none-neutral",
    text: "I prefer not to answer",
  });
  // End question + its options

  // Create a question + its options
  question = chapter.createQuestion({
    title: "Are you expecting twins or more?",
    description: "",
    type: "select",
  });

  question.createOption({
    value: "i-dont-know",
    text: "I don't know",
  });

  question.createOption({
    value: "no",
    text: "No",
  });

  question.createOption({
    value: "yes",
    text: "Yes",
  });
  // End question + its options

  // Create a question + its options
  question = chapter.createQuestion({
    title: "Now that you're pregnant, do you smoke cigarettes?",
    description: "",
    type: "select",
  });

  question.createOption({
    value: "no",
    text: "No",
  });

  question.createOption({
    value: "yes",
    text: "Yes",
  });
  // End question + its options

  // Create a question + its options
  question = chapter.createQuestion({
    title: "Now that you're pregnant, how often do you have a drink that contains alcohol?",
    description: "",
    type: "select",
  });

  question.createOption({
    value: "no",
    text: "No",
  });

  question.createOption({
    value: "yes",
    text: "Yes",
  });
  // End question + its options

  // Create a question + its options
  question = chapter.createQuestion({
    title: "Now that you're pregnant, do you ever use recreational drugs or misuse prescription medication, such as pain drugs?",
    description: "",
    type: "select-multi",
  });

  question.createOption({
    value: "heroin",
    text: "Heroin",
  });

  question.createOption({
    value: "cocaine",
    text: "Cocaine",
  });

  question.createOption({
    value: "marijuana",
    text: "Marijuana",
  });
  // End question + its options

  // Create a question + its options
  //@TODO: This question needs two input fields: feet, inches
  question = chapter.createQuestion({
    title: "How tall are you?",
    description: "",
    type: "select-dropdown",
  });

  // Populate each week's option
  for (let feet = 3; feet <= 7; feet++) {

    for (let inches = 0; inches <= 11; inches++) {
      server.create('option', { value: ((feet * 12) + inches), text: feet +'ft ' + inches + ' in', question: question });
    }
  }
  // End question + its options

  // Create a question + its options
  question = chapter.createQuestion({
    title: "How much did you weigh before you were pregnant?",
    description: "Be honest :)",
    type: "input",
  });

  question.createOption({
    value: "", // Blank because it is a text input field
  });

  // Create a question + its options
  question = chapter.createQuestion({
    title: "What is your ethnicity and/or ancestry?",
    type: "select-multi",
  });

  question.createOption({
    value: "white",
    text: "White",
  });

  question.createOption({
    value: "native-american",
    text: "Native American",
  });

  question.createOption({
    value: "asian",
    text: "Asian",
  });
  // End question + its options

  // Create a question + its options
  question = chapter.createQuestion({
    title: "How far along are you in your pregnancy?",
    type: "select-dropdown",
  });

  question.createOption({
    value: "none",
    text: "I am not currently pregnant",
  });

  // Populate each week's option
  for (let i = 4; i <= 42; i++) {
    server.create('option', { value: (i) +'-weeks', text: (i) +' weeks', question: question });
  }

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  // server.createList('post', 10);
}
