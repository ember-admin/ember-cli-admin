import Navigation from 'ember-cli-admin/dsl/navigation';
import navigationMap from '../navigation';

export function initialize() {
  return Navigation.map(navigationMap);
};

export default {
  name: 'navigation',
  initialize: initialize
};
