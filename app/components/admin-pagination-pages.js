import Ember from 'ember';

export default Ember.Component.extend({
  currentPageBinding: "content.page",
  numberOfPagesBinding: "content.numberOfPages",

  pageItems: function() {
    var currentPage = +(this.get("currentPage"));
    var totalPages = +(this.get("numberOfPages"));

    var res = [];
    for(var i=1; i<=totalPages; i++) {
      res.push({
        page: i,
        current: currentPage == i
      });
    }
    return res;
  }.property("currentPage", "numberOfPages"),

  canStepForward: (function() {
    var page = +(this.get("currentPage"));
    var totalPages = +(this.get("numberOfPages"));
    return page < totalPages;
  }).property("currentPage", "numberOfPages"),

  canStepBackward: (function() {
    var page = +(this.get("currentPage"));
    return page > 1;
  }).property("currentPage"),

  actions: {
    clickPage: function(number) {
      this.set("currentPage", number);
    },
    changePage: function(num) {
      var currentPage = +(this.get("currentPage")),
          totalPages = +(this.get("numberOfPages"));

      if(currentPage === totalPages && num === 1) { return false; }
      if(currentPage <= 1 && num === -1) { return false; }
      this.incrementProperty('currentPage', num);
    }
  }
});