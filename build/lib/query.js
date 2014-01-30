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
            isVisible: function(locator, continuation) {
                var self = this;
                var gen3_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                continuation = gen1_continuationOrDefault(arguments);
                locator = gen3_arguments[0];
                return scope.find(locator, gen2_rethrowErrors(continuation, function(gen4_asyncResult) {
                    var element;
                    element = gen4_asyncResult;
                    return waitUntil(function(continuation) {
                        var gen5_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                        continuation = gen1_continuationOrDefault(arguments);
                        return continuation(void 0, element.is(":visible"));
                    }, {
                        scope: scope
                    }, gen2_rethrowErrors(continuation, function(gen6_asyncResult) {
                        gen6_asyncResult;
                        return continuation(void 0, element.is(":visible"));
                    }));
                }));
            },
            hasSelector: function(locator, gen7_options, continuation) {
                var self = this;
                var gen8_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                continuation = gen1_continuationOrDefault(arguments);
                locator = gen8_arguments[0];
                gen7_options = gen8_arguments[1];
                var count;
                count = gen7_options !== void 0 && Object.prototype.hasOwnProperty.call(gen7_options, "count") && gen7_options.count !== void 0 ? gen7_options.count : void 0;
                return scope.find(locator, gen2_rethrowErrors(continuation, function(gen9_asyncResult) {
                    var numberOfElements;
                    numberOfElements = gen9_asyncResult.length;
                    if (count) {
                        return continuation(void 0, numberOfElements === count);
                    } else {
                        return continuation(void 0, numberOfElements > 0);
                    }
                }));
            }
        };
    };
}).call(this);