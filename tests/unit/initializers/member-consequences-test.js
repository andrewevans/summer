import Ember from 'ember';
import MemberConsequencesInitializer from 'summer/initializers/member-consequences';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | member consequences', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  MemberConsequencesInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
