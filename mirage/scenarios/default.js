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
  });

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
  });

  question.createOption({
    value: "no",
    text: "No",
  });
  // End question + its options

  // Create a question + its options
  question = chapter.createQuestion({
    title: "How old are you?",
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
    server.create('option', { value: (i) + '-weeks', text: (i) + ' weeks', question: question });
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
  });

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
    title: "When did you attend your first prenatal appointment?",
    type: "select",
  });

  question.createOption({
    value: "first-trimester",
    text: "First trimester",
  });

  question.createOption({
    value: "second-trimester",
    text: "Second trimester",
  });

  question.createOption({
    value: "third-trimester",
    text: "Third trimester",
  });

  question.createOption({
    value: "none",
    text: "I haven't had a prenatal appointment",
  });
  // End question + its options

  // Create a question + its options
  let question_conditions = chapter.createQuestion({
    title: "Before this pregnancy, or now that you're pregnant, were you diagnosed with any of the following conditions?" +
    " (Please select all that apply.)",
    type: "custom-extra",
    slug: "current-conditions"
  });

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
    question_conditions.createOption({
      value: preg_conditions[i].dasherize(),
      text: preg_conditions[i],
    });
  }

  question_conditions.createOption({
    value: "__none-true",
    text: "None of the above",
  });

  // Create a question + its options
  var question_conditions_extra = chapter.createQuestion({
    title: "Other conditions (Please specify.)",
    type: "hidden",
    question: question_conditions,
  });

  question_conditions_extra.createOption({
    value: "",
    text: "__input-extra",
  });
  // End question + its options

  // Create a question + its options
  var question_problems = chapter.createQuestion({
    title: "In this pregnancy, have you experienced any of these health problems? (Please select all that apply.) " +
    "(filter based on pregnancy stage)",
    type: "custom-extra",
    slug: "problems",
  });

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
    question_problems.createOption({
      value: preg_problems[i].dasherize(),
      text: preg_problems[i],
    });
  }

  question_problems.createOption({
    value: "__none-true",
    text: "None of the above",
  });
  // End question + its options

  // Create a question + its options
  var question_problems_extra = chapter.createQuestion({
    title: "Other problems (Please specify.)",
    type: "hidden",
    question: question_problems,
  });

  question_problems_extra.createOption({
    value: "",
    text: "__input-extra",
  });
  // End question + its options

  // Create a question + its options
  question = chapter.createQuestion({
    title: "Are you taking any medications to prevent preterm birth?",
    type: "select",
    slug: "preterm-meds",
  });

  question.createOption({
    value: "yes",
    text: "Yes",
  });

  question.createOption({
    value: "no",
    text: "No",
  });
  // End question + its options

  // Create a question + its options
  question = chapter.createQuestion({
    title: "Earlier in this survey, you indicated that you experienced the following medical conditions or risk factors. " +
    "Please check the conditions listed below for which you are currently receiving care from a health provider.",
    type: "select-multi",
  });

  //@TODO: In app, only list options that exist in the preg-conditions question

  for (let i = 0; i < preg_conditions.length; i++) {
    question.createOption({
      value: preg_conditions[i].dasherize(),
      text: preg_conditions[i],
    });
  }
  // End question + its options

  // Create a question + its options
  question = chapter.createQuestion({
    title: "How tall are you?",
    type: "custom-height",
    slug: "height",
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
    title: "How much did you weigh *before* you were pregnant?",
    description: "Be honest :)",
    type: "custom-weight",
  });

  question_weight.createOption({
    value: "", // Blank because it is a text input field
  });

  var question_bmi = chapter.createQuestion({
    title: "What is your BMI?",
    type: "hidden",
  });

  question_bmi.createOption({
    value: "",
    text: "__input-bmi",
  });
  // End question + its options

  // Create a question + its options
  question = chapter.createQuestion({
    title: "What is your race or ethnicity? (Please select all that apply.)",
    type: "select-multi",
  });

  let ethnicity = [
    'African American',
    'Asian',
    'Caribbean',
    'Caucasian',
    'Latina',
    'Jewish',
    'Native American',
    'Pacific Islander',
  ];

  for (let i = 0; i < ethnicity.length; i++) {
    question.createOption({
      value: ethnicity[i].dasherize(),
      text: ethnicity[i],
    });
  }

  question.createOption({
    value: "__none-neutral",
    text: "I prefer not to answer",
  });
  // End question + its options

  // Create a question + its options
  question = chapter.createQuestion({
    title: "Now that you're pregnant, do you smoke cigarettes?",
    type: "select",
    slug: "smoking",
  });

  let smoking = [
    'Yes, but I\'m thinking about quitting.',
    'Yes, and I don\'t plan to quit.',
    'No, I quit smoking when I started trying to conceive.',
    'No, I quit smoking when I found I out I was pregnant.',
    'No, I quit smoking a few weeks into my pregnancy.',
    'No, I\'ve never smoked cigarettes.',
  ];

  for (let i = 0; i < smoking.length; i++) {
    question.createOption({
      value: smoking[i].dasherize(),
      text: smoking[i],
    });
  }

  question.createOption({
    value: "__none-neutral",
    text: "I prefer not to answer",
  });
  // End question + its options

  // Create a question + its options
  question = chapter.createQuestion({
    title: "Now that you're pregnant, how often do you have a drink that contains alcohol?",
    type: "select",
    slug: "alcohol",
  });

  let alcohol = [
    'Nearly every day',
    'Three or four days a week',
    'Two days a week',
    'Once a month',
    'Less than once a month',
    'I don\'t drink alcohol.',
  ];

  for (let i = 0; i < alcohol.length; i++) {
    question.createOption({
      value: alcohol[i].dasherize(),
      text: alcohol[i],
    });
  }
  // End question + its options

  // Create a question + its options
  question = chapter.createQuestion({
    title: "Now that you are pregnant, do you ever use recreational drugs or misuse prescription medication, such as " +
    "pain drugs? (Please select all that apply.)",
    type: "select-multi",
    slug: "drugs",
  });

  let drugs = [
    'Cocaine',
    'Heroin',
    'Marijuana',
    'Opioid pain medication, such as fentanyl, acetaminophen/hydrocodone, or oxycodone',
    'Other recreational drugs',
  ];

  for (let i = 0; i < drugs.length; i++) {
    question.createOption({
      value: drugs[i].dasherize(),
      text: drugs[i],
    });
  }

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
  var question_preg35 = chapter.createQuestion({
    title: "Are you 35 or older and this is your first pregnancy?",
    type: "hidden",
    slug: "preg-35",
  });

  question_preg35.createOption({
    value: "",
    text: "",
  });
  // End question + its options

  // Create a question + its options
  question = chapter.createQuestion({
    title: "Are you worried about anything concerning your pregnancy or the health of your baby?",
    type: "input",
  });

  question.createOption({
    value: "", // Blank because it is a text input field
  });
  // End question + its options

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  // server.createList('post', 10);
}
