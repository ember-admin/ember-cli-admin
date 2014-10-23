import Ember from 'ember';

var queryParamsMixin;

queryParamsMixin = Ember.Mixin.create({
  queryParams: ['page', 'perPage', 'q', 'sort', 'orderAscending'],
  page: 1,
  perPage: 25,
  q: '',
  sort: '',
  orderAscending: false
});

export default queryParamsMixin;