(function() {
    var self = this;
    var finders;
    finders = require("./finders");
    module.exports = function(element) {
        var self = this;
        var find;
        find = finders(element).find;
        return {
            isVisible: function(locator) {
                var self = this;
                return find(locator).is(":visible");
            }
        };
    };
}).call(this);