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
    var gen2_rethrowErrors = function(continuation, block) {
        return function(error, result) {
            if (error) {
                return continuation(error);
            } else {
                try {
                    return block(result);
                } catch (ex) {
                    return continuation(ex);
                }
            }
        };
    };
    var self = this;
    var finders, waitUntil;
    finders = require("./finders");
    waitUntil = require("./waitUntil").waitUntil;
    module.exports = function(element) {
        var self = this;
        var find;
        find = finders(element).find;
        return {
            isVisible: function(locator) {
                var self = this;
                return find(locator).is(":visible");
            },
            hasSelector: function(locator, continuation) {
                var self = this;
                var gen3_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                continuation = gen1_continuationOrDefault(arguments);
                locator = gen3_arguments[0];
                return waitUntil(function(continuation) {
                    var gen4_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                    continuation = gen1_continuationOrDefault(arguments);
                    return continuation(void 0, find(locator).length > 0);
                }, gen2_rethrowErrors(continuation, function(gen5_asyncResult) {
                    gen5_asyncResult;
                    return continuation(void 0, find(locator).length > 0);
                }));
            }
        };
    };
}).call(this);