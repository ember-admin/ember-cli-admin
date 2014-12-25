import Ember from 'ember';

export default Ember.Mixin.create({
  queryParams: {
    page: {
      refreshModel: true
    },
    perPage: {
      refreshModel: true
    },
    q: {
      refreshModel: true
    },
    sort: {
      refreshModel: true
    },
    orderAscending: {
      refreshModel: true
    }
  }
});
