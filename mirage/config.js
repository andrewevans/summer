export default function() {

  this.namespace = '/ws/ajax/v1/loggedin'; // summer app's external API prefix

  this.get('/responses'); // Custom Solarium endpoint for tags

  this.passthrough('/responses', ['patch', 'post']); // Custom Solarium endpoint for tags, emberx-select does a PATCH

  this.get('/consequence-links');

  this.get('/members/:id');

  this.passthrough('/members/:id', ['patch']);

  this.get('/chapters');

  this.get('/chapters/:id');

  this.get('/questions/:id');

  this.get('/tags/:id');

  this.del('/responses/:id');
}
