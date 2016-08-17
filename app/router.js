import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index', { path: '' }, function() {
    this.route('chapter', { path: '/chapters/:id' }, function() {
      this.route('question', { path: '/question/:sequence_num' });
      this.route('welcome', { path: '/welcome' });
      this.route('results', { path: '/results' });
    });
    this.route('chapters', function() {
      this.route('chapter');
    });
  });
});

export default Router;
