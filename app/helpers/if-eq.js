import Ember from 'ember';

export function ifEq(params/*, hash*/) {

  // Simply compare left and right values
  if (params[0] === params[1]) {
    return true;
  }

  return false;
}

export default Ember.Helper.helper(ifEq);
