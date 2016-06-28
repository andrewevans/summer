export default function(server) {

  server.loadFixtures();

  let member = server.schema.members.find(4); // Get member "lana"

  member.createTag({ questionId: 1116, response: 'no', chapterId: 102 });
  member.createTag({ questionId: 1123, response: '125', chapterId: 102 });
  member.createTag({ questionId: 1010, response: '18-34', chapterId: 102 });

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  // server.createList('post', 10);
}
