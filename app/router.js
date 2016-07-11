import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('people');
  this.route('index', { path: '' }, function() {
    this.route('chapter', { path: '/chapters/:id' }, function() {
      this.route('question', { path: '/question/:sequence_num' });
      this.route('welcome', { path: '/welcome' });
      this.route('results', { path: '/results' });
    });
  });
});

export default Router;
