export default function() {

  this.namespace = '/ws/ajax/v1'; // summer app's external API prefix

  this.passthrough('/responses');

  this.get('/consequence-links');

  this.get('/members/:id');

  this.patch('/members/:id');

  this.get('/chapters');

  this.get('/chapters/:id');

  this.get('/questions/:id');

  this.get('/tags/:id');

  this.patch('/tags/:id'); // emberx-select does a PATCH
  this.post('/tags');

  this.delete('/tags/:id');
}
