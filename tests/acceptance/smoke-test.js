import Ember from 'ember';
import startApp from '../helpers/start-app';
import Pretender from 'pretender';

var App, server;

module('Acceptance: Smoke Test', {
    setup: function() {
        App = startApp();
        server = new Pretender(function() {
            this.get('/api/cars', function(request) {
                var car = {id:1, title: 'TEST CAR'};
                return [200, {"Content-Type": "application/json"}, JSON.stringify({cars: [car], meta:{total: 1}})];
            });
        });
    },
    teardown: function() {
        Ember.run(App, 'destroy');
        server.shutdown();
    }
});

test('root displays dashboard', function() {
    expect(1);
    visit('/');
    equal(find("h1:contains('Dashboard')").length, 1);
});


test('navbar contains links to dashboard and resources', function() {
    expect(2);
    visit('/');
    equal(find(".navbar a:contains('Users')").length, 1);
    equal(find(".navbar a:contains('Dashboard')").length, 1);
});

test('pods can be resolved', function() {
    expect(1);
    visit('/cars');
    andThen(function() {
        equal(find("tbody tr").length, 1);
    });
});
