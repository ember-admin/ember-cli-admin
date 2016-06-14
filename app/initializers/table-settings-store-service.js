export function initialize(application) {
    application.inject('controller', 'tableSettingsStore',
      'service:table-settings-store');
};

export default {
  name: 'table-settings-store-service',
  initialize: initialize
};
