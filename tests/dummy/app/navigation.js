export default function() {
  this.navigate("Dashboard", {
    route: "dashboard"
  });
  this.navigate("Admin", function() {
    this.navigate("Users");
    this.navigate("User Categories");
  });
  this.navigate("Catalogues");
  this.navigate("Cars");
}
