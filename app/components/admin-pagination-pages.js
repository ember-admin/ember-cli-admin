import Ember from 'ember';

export default Ember.Component.extend({
  currentPageBinding: "content.page",
  numberOfPagesBinding: "content.numberOfPages",

  pageItems: function() {
    var currentPage = +(this.get("currentPage"));
    var totalPages = +(this.get("numberOfPages"));

    var res = [{
        title: currentPage,
        page: currentPage,
        current: true
    }];

    var noSkipDistance = 5;

    for(var i = currentPage - 1; i > 0; ) {
        if (currentPage - i < noSkipDistance || i == 1) {
            res.unshift({
                title: i,
                page: i
            });
            i--;
        } else {
            var offset = i - currentPage;
            res.unshift({
                title: offset,
                page: i
            });
            i = Math.max(currentPage + offset * 10, 1);
        }
    };

    for(var i = currentPage + 1; i <= totalPages; ) {
        if (i - currentPage < noSkipDistance || i == totalPages) {
            res.push({
                title: i,
                page: i
            });
            i++;
        } else {
            var offset = i - currentPage;
            res.push({
                title: '+' + offset,
                page: i
            });
            i = Math.min(currentPage + offset * 10, totalPages);
        }
    };

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

  onePage: (function() {
    var totalPages = +(this.get("numberOfPages"));
    return totalPages === 1;
  }).property('numberOfPages'),

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
