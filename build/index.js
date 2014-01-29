(function() {
    var self = this;
    var scope, assertions, angular;
    scope = require("./lib/scope");
    assertions = require("./lib/assertions");
    angular = require("./lib/angular/bootstrap");
    module.exports = function(element, config) {
        var self = this;
        return scope(element, config);
    };
    module.exports.bootstrapAngular = angular.bootstrapAngular;
    module.exports.assertions = assertions;
}).call(this);