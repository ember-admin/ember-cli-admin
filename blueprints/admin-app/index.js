module.exports = {
  description: 'Generates an admin app scaffold',
  locals: function(options) {
    var entity = options.entity;
    var adminAppName = entity.name;
    var titleLinksTo = entity.titleLinksTo || 'http://ember-admin.com';

    return {
      modulePrefix: this.project.name(),
      adminAppName: adminAppName,
      titleLinksTo: titleLinksTo,
    };
  },
};
