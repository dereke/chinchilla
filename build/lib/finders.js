(function() {
    var self = this;
    module.exports = function(element) {
        var self = this;
        return {
            find: function(locator) {
                var self = this;
                return element.find(locator);
            }
        };
    };
}).call(this);