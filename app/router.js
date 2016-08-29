import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index', { path: '' }, function() {
    this.route('chapters', { path: '/assessments' }, function() {
      this.route('chapter', { path: ':id' }, function() {
        this.route('welcome');
        this.route('results');
        this.route('questions', function() {
          this.route('question', { path: ':sequence_num'} );
        });
      });
    });
  });
});

export default Router;
