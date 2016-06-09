export default function(server) {

  window.console.log("in scenarios");
  server.createList('author', 10);
  server.createList('chapter', 3);
  server.createList('question', 10, { chapterId: 102 });
  server.createList('question', 65, { chapterId: 100 });

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  // server.createList('post', 10);
}
