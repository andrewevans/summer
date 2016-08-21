export default function(server) {

  server.loadFixtures();

  let member = server.schema.members.find(4); // Get member "lana"


  server.create('response', {
    memberId: 4,
    surveyId: 102,
    questions: {
      questionId: '3',
      questionNumber: -1,
      response: ['18-34'],
    },
  });

  server.create('response', {
    memberId: 4,
    surveyId: 102,
    questions: {
      questionId: '4',
      questionNumber: -1,
      response: [null],
    },
  });

  let chapter = server.schema.chapters.find(102);

  let question;

  // Create a question + its options
  question = chapter.createQuestion({
    title: "Do you live in the United States?",
    type: "select",
    slug: "live-usa",
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
    title: "Are you currently pregnant?",
    type: "select",
    slug: "preg-now",
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
    title: "How old are you?",
    description: "",
    type: "select",
    slug: "age",
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
    title: "Congratulations! How many weeks pregnant are you?",
    type: "select-dropdown",
  });

  // Populate each week's option
  for (let i = 2; i <= 44; i++) {
    server.create('option', { value: (i) +'-weeks', text: (i) +' weeks', question: question });
  }

  //@TODO: Add 'Not sure? Check with our due date calculator'

  question = chapter.createQuestion({
    title: "Is this your first pregnancy?",
    type: 'select',
    slug: "first-preg",
  });

  question.createOption({
    value: "yes",
    text: "Yes",
  });

  question.createOption({
    value: "no",
    text: "No",
  });

  //@TODO: 'yes' is part of preg-35 tag

  //@TODO: 'skip previous pregnancy section'

  // Create a question + its options
  question = chapter.createQuestion({
    title: "Did this pregnancy result from fertility treatments?",
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
    title: "Are you expecting twins?",
    type: "select",
    slug: 'twins',
  });

  question.createOption({
    value: "yes",
    text: "Yes",
  });

  question.createOption({
    value: "no",
    text: "No",
  });

  question.createOption({
    value: "i-dont-know",
    text: "I don't know",
  });
  // End question + its options

  // Create a question + its options
  var question_prev_condition = chapter.createQuestion({
    title: "Have you experienced any of the following in a past pregnancy or delivery? (Please select all that apply.)",
    type: "custom-extra",
    slug: 'past-preg',
  });

  question_prev_condition.createOption({
    value: "genetic-issues",
    text: "Baby born with genetic issues",
  });

  question_prev_condition.createOption({
    value: "cholestasis",
    text: "Cholestasis of pregnancy",
  });

  question_prev_condition.createOption({
    value: "ectopic",
    text: "Ectopic pregnancy",
  });

  question_prev_condition.createOption({
    value: "miscarriage-20",
    text: "Miscarriage before 20 weeks of gestation",
  });

  question_prev_condition.createOption({
    value: "pounds-4",
    text: "Newborn with a birth weight of less than 4 pounds",
  });

  question_prev_condition.createOption({
    value: "pounds-9",
    text: "Newborn with a birth weight of more than 9 pounds",
  });

  question_prev_condition.createOption({
    value: "placenta",
    text: "Placenta previa or abruption",
  });

  question_prev_condition.createOption({
    value: "preeclampsia",
    text: "Preeclampsia",
  });

  question_prev_condition.createOption({
    value: "prom",
    text: "Premature rupture of membranes (PROM)",
  });

  question_prev_condition.createOption({
    value: "preterm-delivery",
    text: "Preterm delivery (birth before 37 weeks of pregnancy)",
  });

  question_prev_condition.createOption({
    value: "preterm-labor",
    text: "Preterm labor (including a softened, shortened, or dilated cervix)",
  });

  question_prev_condition.createOption({
    value: "postpartum-depression",
    text: "Postpartum depression",
  });

  question_prev_condition.createOption({
    value: "stillbirth",
    text: "Stillbirth (a baby dying in utero at 20 weeks of pregnancy or later)",
  });

  question_prev_condition.createOption({
    value: "uterine-abnormality",
    text: "Uterine abnormality, such as fibroids or septate uterus",
  });

  question_prev_condition.createOption({
    value: "__none-true",
    text: "None of the above",
  });
  // End question + its options

  // Create a question + its options
  var question_prev_condition_extra = chapter.createQuestion({
    title: "Other conditions (Please specify.)",
    description: "",
    type: "hidden",
    question: question_prev_condition,
  });

  question_prev_condition_extra.createOption({
    value: "",
    text: "__input-extra",
  });
  // End question + its options

  // Create a question + its options
  question = chapter.createQuestion({
    title: "How many miscarriages have you had?",
    type: "select",
    slug: "miscarriage",
  });

  question.createOption({
    value: "0",
    text: "None",
  });

  question.createOption({
    value: "1",
    text: "One",
  });

  question.createOption({
    value: "2+",
    text: "Two or more",
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

  // Create a custom question + its options
  var question_condition = chapter.createQuestion({
    title: "Previous or current conditions",
    description: "",
    type: "custom-extra",
  });

  question_condition.createOption({
    value: "condition-01",
    text: "Condition 01",
  });

  question_condition.createOption({
    value: "condition-02",
    text: "Condition 02",
  });

  question_condition.createOption({
    value: "condition-03",
    text: "Condition 03",
  });

  question_condition.createOption({
    value: "condition-04",
    text: "Condition 04",
  });

  question_condition.createOption({
    value: "condition-05",
    text: "Condition 05",
  });

  question_condition.createOption({
    value: "condition-A",
    text: "Condition A",
  });

  question_condition.createOption({
    value: "condition-B",
    text: "Condition B",
  });

  question_condition.createOption({
    value: "condition-C",
    text: "Condition C",
  });

  question_condition.createOption({
    value: "condition-D",
    text: "Condition D",
  });

  question_condition.createOption({
    value: "condition-E",
    text: "Condition E",
  });

  question_condition.createOption({
    value: "condition-F",
    text: "Condition F",
  });

  question_condition.createOption({
    value: "condition-G",
    text: "Condition G",
  });

  question_condition.createOption({
    value: "__none-true",
    text: "None of the above",
  });

  question_condition.createOption({
    value: "__none-neutral",
    text: "I prefer not to answer",
  });
  // End question + its options

  // Create a question + its options
  var question_condition_extra = chapter.createQuestion({
    title: "Any other previous or current conditions?",
    description: "",
    type: "hidden",
    question: question_condition,
  });

  question_condition_extra.createOption({
    value: "",
    text: "__input-extra",
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
    type: "custom-height",
  });

  question.createOption({
    value: "", // Blank because it is a text input field
    text: "__feet",
  });

  question.createOption({
    value: "", // Blank because it is a text input field
    text: "__inches",
  });
  // End question + its options

  // Create a question + its options
  var question_weight = chapter.createQuestion({
    title: "How much did you weigh before you were pregnant?",
    description: "Be honest :)",
    type: "custom-weight",
  });

  question_weight.createOption({
    value: "", // Blank because it is a text input field
  });

  var question_bmi = chapter.createQuestion({
    title: "What is your BMI?",
    description: "",
    type: "hidden",
  });

  question_bmi.createOption({
    value: "",
    text: "__input-bmi",
  });

  var question_preg35 = chapter.createQuestion({
    title: "Are you 35 or older and this is your first pregnancy?",
    description: "",
    type: "hidden",
    slug: "preg-35",
  });

  question_preg35.createOption({
    value: "",
    text: "",
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

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  // server.createList('post', 10);
}
