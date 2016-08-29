import Session from '../services/storage';

var session = Session.create({
  type: 'local', //@TODO: Change to 'session' once everything is moved from localStorage to sessionStorage
});

export function initialize(application) {
  application.register('service:session', session, {instantiate: false});

  application.inject('route', 'session', 'service:session');
  application.inject('component', 'session', 'service:session');
  application.inject('session:pagination-nav', 'session', 'service:session');
}

export default {
  name: 'session-service',
  initialize
};
