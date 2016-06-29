export default function(server) {

  server.loadFixtures();

  let member = server.schema.members.find(4); // Get member "lana"

  member.createTag({ questionId: 1116, answer: ['yes'], chapterId: 102 });
  member.createTag({ questionId: 1123, answer: ['127'], chapterId: 102 });
  member.createTag({ questionId: 1010, answer: ['18-34'], chapterId: 102 });

  member = server.schema.members.find(1); // Get member "citizen4"

  member.createTag({ questionId: 1116, answer: ['xoxoxoxoxoxo'], chapterId: 102 });
  member.createTag({ questionId: 1123, answer: ['xoxoxoxoxoxo'], chapterId: 105 });
  member.createTag({ questionId: 1010, answer: ['xoxoxoxoxoxo'], chapterId: 101 });
  member.createTag({ questionId: 1116, answer: ['xoxoxoxoxoxo'], chapterId: 102 });
  member.createTag({ questionId: 1151, answer: ['xoxoxoxoxoxo'], chapterId: 104 });
  member.createTag({ questionId: 1152, answer: ['xoxoxoxoxoxo'], chapterId: 104 });
  member.createTag({ questionId: 1153, answer: ['xoxoxoxoxoxo'], chapterId: 102 });
  member.createTag({ questionId: 1154, answer: ['xoxoxoxoxoxo'], chapterId: 102 });

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  // server.createList('post', 10);
}
