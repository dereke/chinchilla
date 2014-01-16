(function() {
    var self = this;
    var _, finders, actions;
    _ = require("underscore");
    finders = require("./lib/finders");
    actions = require("./lib/actions");
    module.exports = function(element) {
        var self = this;
        return _.extend({}, finders(element), actions(element));
    };
}).call(this);