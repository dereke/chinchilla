(function() {
    var gen1_rethrowErrors = function(continuation, block) {
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
    var gen2_continuationOrDefault = function(args) {
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
    module.exports = function(scope) {
        var self = this;
        return {
            isVisible: function(locator, continuation) {
                var self = this;
                var gen3_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                continuation = gen2_continuationOrDefault(arguments);
                locator = gen3_arguments[0];
                return scope.find(locator, gen1_rethrowErrors(continuation, function(gen4_asyncResult) {
                    return continuation(void 0, gen4_asyncResult.is(":visible"));
                }));
            },
            hasSelector: function(locator, gen5_options, continuation) {
                var self = this;
                var gen6_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                continuation = gen2_continuationOrDefault(arguments);
                locator = gen6_arguments[0];
                gen5_options = gen6_arguments[1];
                var count;
                count = gen5_options !== void 0 && Object.prototype.hasOwnProperty.call(gen5_options, "count") && gen5_options.count !== void 0 ? gen5_options.count : void 0;
                return scope.find(locator, gen1_rethrowErrors(continuation, function(gen7_asyncResult) {
                    var numberOfElements;
                    numberOfElements = gen7_asyncResult.length;
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