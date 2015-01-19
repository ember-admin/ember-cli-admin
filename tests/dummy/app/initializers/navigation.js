import Navigation from 'ember-cli-admin/dsl/navigation';
var initializer;

initializer = {
  name: 'navigation',
  initialize: function() {
    return Navigation.map(function() {

      /*
        Dashboard page
        You can owerride this if you don't use dashboard
       */
      this.navigate("Dashboard", {
        route: "dashboard"
      });
      this.navigate("Admin", function() {
        this.navigate("Users");
        return this.navigate("User Categories");
      });
      return this.navigate("Catalogues");
    });
  }
};

export default initializer;
