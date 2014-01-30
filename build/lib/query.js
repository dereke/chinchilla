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
            isVisible: function(locator, gen3_options, continuation) {
                var self = this;
                var gen4_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                continuation = gen1_continuationOrDefault(arguments);
                locator = gen4_arguments[0];
                gen3_options = gen4_arguments[1];
                var options;
                options = gen3_options !== void 0 && Object.prototype.hasOwnProperty.call(gen3_options, "options") && gen3_options.options !== void 0 ? gen3_options.options : void 0;
                return scope.find(locator, gen2_rethrowErrors(continuation, function(gen5_asyncResult) {
                    var element;
                    element = gen5_asyncResult;
                    return waitUntil(function(continuation) {
                        var gen6_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                        continuation = gen1_continuationOrDefault(arguments);
                        return continuation(void 0, element.is(":visible"));
                    }, {
                        scope: scope,
                        options: options
                    }, gen2_rethrowErrors(continuation, function(gen7_asyncResult) {
                        gen7_asyncResult;
                        return continuation(void 0, element.is(":visible"));
                    }));
                }));
            },
            hasSelector: function(locator, gen8_options, continuation) {
                var self = this;
                var gen9_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                continuation = gen1_continuationOrDefault(arguments);
                locator = gen9_arguments[0];
                gen8_options = gen9_arguments[1];
                var count;
                count = gen8_options !== void 0 && Object.prototype.hasOwnProperty.call(gen8_options, "count") && gen8_options.count !== void 0 ? gen8_options.count : void 0;
                return scope.find(locator, gen2_rethrowErrors(continuation, function(gen10_asyncResult) {
                    var numberOfElements;
                    numberOfElements = gen10_asyncResult.length;
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