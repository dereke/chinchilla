(function() {
    var self = this;
    var scope, angular;
    scope = require("./lib/scope");
    angular = require("./lib/angular/bootstrap");
    module.exports = function(element) {
        var self = this;
        return scope(element);
    };
    module.exports.bootstrapAngular = angular.bootstrapAngular;
}).call(this);