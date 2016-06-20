export function initialize(application) {
  application.inject('route', 'member-consequences', 'service:member-consequences');
}

export default {
  name: 'member-consequences',
  initialize
};
