module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    var self = this;
    return this.addPackagesToProject([
      {name: "ember-cli-map", target: "0.4.2"},
      {name: "ember-cli-bootstrap-datepicker", target: "0.4.0"},
      {name: "ember-cli-sass", target: "4.0.0-beta.5"}
    ]).then(function() {
      return self.addBowerPackagesToProject([
        {name: "bootstrap-sass-official", target: "3.3.4"},
        {name: "bootstrap-datepicker", target: "~1.4.0"},
        {name: "typeahead.js", target: "0.10.5"},
        {name: "jquery-ui-sortable", target: "*"},
        {name: "jquery-ui-touch-punch-improved", target: "0.3.1"}
      ]);
    });
  }
};
