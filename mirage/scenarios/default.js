export default function(server) {

  window.console.log("in scenarios");
  server.loadFixtures();
  server.createList('author', 10);
  server.createList('chapter', 3);
  server.createList('question', 5, { chapterId: 200 });
  server.createList('question', 65, { chapterId: 201 });

  let member = server.schema.members.find(4); // Get member "lana"
  member.createTag({ questionId: 1001, response: 'no', chapterId: 102 });
  member.createTag({ questionId: 1002, response: 'yes', chapterId: 102 });
  member.createTag({ questionId: 1003, response: 'yes', chapterId: 102 });
  member.createTag({ questionId: 1004, response: 'maybe', chapterId: 102 });
  member.createTag({ questionId: 1009, response: 'no', chapterId: 102 });
  member.createTag({ questionId: 1010, response: 'no', chapterId: 102 });

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  // server.createList('post', 10);
}
