import Ember from 'ember';

export default Ember.Component.extend({
  currentPageBinding: "content.page",
  numberOfPagesBinding: "content.numberOfPages",

  pageItems: Ember.computed("currentPage", "numberOfPages", {
    get: function() {
      var currentPage = +(this.get("currentPage"));
      var totalPages = +(this.get("numberOfPages"));

      var res = [{
        title: currentPage,
        page: currentPage,
        current: true
      }];

      var noSkipDistance = 5;

      for (let i = currentPage - 1; i > 0;) {
        if (currentPage - i < noSkipDistance || i === 1) {
          res.unshift({
            title: i,
            page: i
          });
          i--;
        } else {
          let offset = i - currentPage;
          res.unshift({
            title: offset,
            page: i
          });
          i = Math.max(currentPage + offset * 10, 1);
        }
      }

      for (let i = currentPage + 1; i <= totalPages;) {
        if (i - currentPage < noSkipDistance || i === totalPages) {
          res.push({
            title: i,
            page: i
          });
          i++;
        } else {
          let offset = i - currentPage;
          res.push({
            title: '+' + offset,
            page: i
          });
          i = Math.min(currentPage + offset * 10, totalPages);
        }
      }

      return res;
    }
  }),

  canStepForward: Ember.computed("currentPage", "numberOfPages", {
    get: function() {
      var page = +(this.get("currentPage"));
      var totalPages = +(this.get("numberOfPages"));
      return page < totalPages;
    }
  }),

  canStepBackward: Ember.computed("currentPage", {
    get: function() {
      var page = +(this.get("currentPage"));
      return page > 1;
    }
  }),

  onePage: Ember.computed('numberOfPages', {
    get: function() {
      var totalPages = +(this.get("numberOfPages"));
      return totalPages === 1;
    }
  }),

  actions: {
    clickPage: function(number) {
      this.set("currentPage", number);
    },
    changePage: function(num) {
      var currentPage = +(this.get("currentPage")),
        totalPages = +(this.get("numberOfPages"));

      if (currentPage === totalPages && num === 1) {
        return false;
      }
      if (currentPage <= 1 && num === -1) {
        return false;
      }
      this.incrementProperty('currentPage', num);
    }
  }
});
