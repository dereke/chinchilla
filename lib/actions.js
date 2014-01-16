(function() {
    var gen1_continuationOrDefault = function(args) {
        var c = args[args.length - 1];
        if (c instanceof Function) {
            return c;
        } else {
            return function(error, result) {
                if (error) {
                    throw error;
                } else {
                    return result;
                }
            };
        }
    };
    var self = this;
    var finders;
    finders = require("./finders");
    module.exports = function(element) {
        var self = this;
        var find;
        find = finders(element).find;
        return {
            click: function(locator, continuation) {
                var self = this;
                var gen2_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                continuation = gen1_continuationOrDefault(arguments);
                locator = gen2_arguments[0];
                var item, handler;
                item = find(locator);
                handler = function(e) {
                    item.off("click", handler);
                    if (continuation) {
                        setTimeout(function() {
                            continuation(void 0, e);
                        }, 0);
                    }
                };
                item.on("click", handler);
                return item.click();
            }
        };
    };
}).call(this);