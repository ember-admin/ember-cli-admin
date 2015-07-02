import Ember from 'ember';
import {module, test} from 'qunit';
import startApp from '../helpers/start-app';
import Router from '../../router';
import MetaRoute from 'ember-cli-admin/dsl/meta-route';

var App, users, router;

module('Acceptance: Meta route Test', {
    beforeEach: function () {
        MetaRoute.map(Router, {path: "/admin"}, function () {
            this.resources("users");
            this.route("dashboard", {path: "/"});
        });

        App = startApp();
    },
    afterEach: function () {
        MetaRoute.map(Router, function() {
            this.route("dashboard", {path: "/"});
            this.resources("users");
            this.resources("cars");
            this.resources("user-categories");
            this.resources("catalogues");
        });

        Ember.run(App, 'destroy');
    }
});

test('/admin/users is displayed', function (assert) {
    assert.expect(1);

    server.createList('avatar', 25);
    server.createList('user', 25);

    visit('/admin/users');
    andThen(function () {
        assert.equal(find("tbody tr").length, 25);
    });
});
