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
    var waitUntil;
    waitUntil = require("./waitUntil").waitUntil;
    module.exports = function(scope) {
        var self = this;
        return {
            find: function(locator, continuation) {
                var self = this;
                var gen3_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                continuation = gen1_continuationOrDefault(arguments);
                locator = gen3_arguments[0];
                return waitUntil(function(continuation) {
                    var gen4_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                    continuation = gen1_continuationOrDefault(arguments);
                    if (!locator) {
                        throw new Error("It seems like find was not called with the async operator - `!` in pogo)");
                    }
                    return continuation(void 0, scope.element.find(locator).length > 0);
                }, {
                    scope: scope
                }, gen2_rethrowErrors(continuation, function(gen5_asyncResult) {
                    gen5_asyncResult;
                    return continuation(void 0, scope.element.find(locator));
                }));
            }
        };
    };
}).call(this);