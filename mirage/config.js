export default function() {


  this.passthrough('/ws/ajax/v1/responses');

  this.get('/consequence-links');

  this.get('/members/:id');

  this.patch('/members/:id');

  this.get('/chapters');

  this.get('/chapters/:id');

  this.get('/questions/:id');

  this.get('/tags', ({ tags }, request) => {
    window.console.log("in config (not namespaced): /tags");

    var params = request.queryParams,
      tags_filtered = tags.where(params);

    return tags_filtered;
  });

  this.get('/tags/:id');

  this.namespace = '/api/v1';

  this.get('/authors', ({ authors }, request) => {
    window.console.log("in config: /authors");
    return authors.all();
  });

  this.get('/authors/:id', ({ authors }, request) => {
    window.console.log("in config: /authors/:id");
    var id = request.params.id;
    return authors.find(id);
  });

  this.get('/members', ({ members }, request) => {
    window.console.log("in config: /members");
    return members.all();
  });

  this.get('/members/:id', ({ members }, request) => {
    window.console.log("in config: /members/:id");
    var id = request.params.id;
    return members.find(id);
  });

  this.get('/chapters', ({ chapters }, request) => {
    window.console.log("in config: /chapters");
    return chapters.all();
  });

  this.get('/chapters/:id', ({ chapters }, request) => {
    window.console.log("in config: /chapters/:id");
    var id = request.params.id;
    return chapters.find(id);
  });

  this.get('/chapters/:chapter_id/questions', ({ questions }, request) => {
    window.console.log("in config: /chapters/:chapter_id/questions");
    var chapter_id = request.params.chapter_id;
    return questions.where({ chapterId: chapter_id });
  });

  this.passthrough('/responses'); // This will be the endpoint that receives the member responses

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.0-beta.7/shorthands/
  */
}
