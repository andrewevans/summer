export default function() {

  this.namespace = '/ws/ajax/v1/loggedin'; // summer app's external API prefix

  this.get('/responses'); // Custom Solarium endpoint for tags

  this.passthrough('/responses', ['post']); // Custom Solarium endpoint for tags, emberx-select does a PATCH

  this.passthrough('/responses/:id', ['post']); // Custom Solarium endpoint for tags

  //@TODO: PATCH for /responses is not handled because the server is not currently sending data to the app to be PATCH'd

  this.get('/consequence-links');

  this.get('/members/:id');

  //@TODO: PATCH for /members is handled because there is a mock member loaded with the app
  this.patch('/members/:id', function({ members }, request) {
    let id = request.params.id,
      attrs = request.requestBody;

      members.find(id).update(attrs);

    //@TODO: Return the updated object
    return {
      id: id
    };
  });

  this.get('/chapters');

  this.get('/chapters/:id');

  this.get('/questions/:id');

  this.get('/tags/:id');
}
