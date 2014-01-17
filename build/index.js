(function() {
    var self = this;
    var _, finders, actions, query, angular;
    _ = require("underscore");
    finders = require("./lib/finders");
    actions = require("./lib/actions");
    query = require("./lib/query");
    angular = require("./lib/angular/bootstrap");
    module.exports = function(element) {
        var self = this;
        return _.extend({}, finders(element), actions(element), query(element));
    };
    module.exports.bootstrapAngular = angular.bootstrapAngular;
}).call(this);