module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    var self = this;
    return this.addPackagesToProject([
      {name: "ember-cli-map", target: "0.2.2"},
      {name: "ember-cli-bootstrap-datepicker", target: "0.4.0"},
      {name: "broccoli-merge-trees", target: "0.1.4"},
      {name: "broccoli-static-compiler", target: "0.1.4"},
      {name: "ember-cli-sass", target: "^4.0.0"}
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
