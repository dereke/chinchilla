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
    var gen3_asyncIfElse = function(condition, thenBody, elseBody, cb) {
        if (condition) {
            try {
                thenBody(cb);
            } catch (ex) {
                cb(ex);
            }
        } else {
            try {
                elseBody(cb);
            } catch (ex) {
                cb(ex);
            }
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
            isVisible: function(locator, continuation) {
                var self = this;
                var gen4_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                continuation = gen2_continuationOrDefault(arguments);
                locator = gen4_arguments[0];
                return find(locator, gen1_rethrowErrors(continuation, function(gen5_asyncResult) {
                    return continuation(void 0, gen5_asyncResult.is(":visible"));
                }));
            },
            hasSelector: function(locator, gen6_options, continuation) {
                var self = this;
                var gen7_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                continuation = gen2_continuationOrDefault(arguments);
                locator = gen7_arguments[0];
                gen6_options = gen7_arguments[1];
                var count;
                count = gen6_options !== void 0 && Object.prototype.hasOwnProperty.call(gen6_options, "count") && gen6_options.count !== void 0 ? gen6_options.count : void 0;
                return gen3_asyncIfElse(count, function(continuation) {
                    var gen8_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                    continuation = gen2_continuationOrDefault(arguments);
                    return find(locator, gen1_rethrowErrors(continuation, function(gen9_asyncResult) {
                        return continuation(void 0, gen9_asyncResult.length === count);
                    }));
                }, function(continuation) {
                    var gen10_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                    continuation = gen2_continuationOrDefault(arguments);
                    return find(locator, gen1_rethrowErrors(continuation, function(gen11_asyncResult) {
                        return continuation(void 0, gen11_asyncResult.length > 0);
                    }));
                }, continuation);
            }
        };
    };
}).call(this);