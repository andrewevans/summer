export default function() {

  this.passthrough('/ws/ajax/v1/responses');

  this.get('/consequence-links');

  this.get('/members/:id');

  this.patch('/members/:id');

  this.get('/chapters');

  this.get('/chapters/:id');

  this.get('/questions/:id');

  this.get('/tags/:id');

  this.delete('/tags/:id');

  this.namespace = '/api/v1';

  this.passthrough('/responses'); // This will be the endpoint that receives the member responses
}
