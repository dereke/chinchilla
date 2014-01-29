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
    var gen3_asyncIf = function(condition, thenBody, cb) {
        if (condition) {
            try {
                thenBody(cb);
            } catch (ex) {
                cb(ex);
            }
        } else {
            cb();
        }
    };
    var self = this;
    module.exports = function(chai, utils) {
        var self = this;
        var haveSelector;
        haveSelector = function(assert, locator, options, continuation) {
            var gen4_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
            continuation = gen2_continuationOrDefault(arguments);
            assert = gen4_arguments[0];
            locator = gen4_arguments[1];
            options = gen4_arguments[2];
            var scope, count;
            scope = utils.flag(assert, "object");
            if (utils.flag(assert, "negate")) {
                throw new Error("This assertion cannot be used with a negation.\nPlease use 'not have selector' instead.");
            }
            count = void 0;
            if (options) {
                count = options.count;
            }
            return scope.hasSelector(locator, {
                count: count
            }, gen1_rethrowErrors(continuation, function(gen5_asyncResult) {
                var hasSelector, message;
                hasSelector = gen5_asyncResult;
                message = "to exist";
                return gen3_asyncIf(count && !hasSelector, function(continuation) {
                    var gen6_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                    continuation = gen2_continuationOrDefault(arguments);
                    return scope.find(locator, gen1_rethrowErrors(continuation, function(gen7_asyncResult) {
                        return continuation(void 0, message = "to have " + count + " occurrences (only " + gen7_asyncResult.length + " found)");
                    }));
                }, gen1_rethrowErrors(continuation, function(gen8_asyncResult) {
                    gen8_asyncResult;
                    return continuation(void 0, {
                        hasSelector: hasSelector,
                        message: message
                    });
                }));
            }));
        };
        chai.Assertion.addMethod("haveSelector", function(locator, options, continuation) {
            var gen9_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
            continuation = gen2_continuationOrDefault(arguments);
            locator = gen9_arguments[0];
            options = gen9_arguments[1];
            return haveSelector(this, locator, options, gen1_rethrowErrors(continuation, function(gen10_asyncResult) {
                var result;
                result = gen10_asyncResult;
                return continuation(void 0, assert(result.hasSelector, "expected element '" + locator + "' " + result.message));
            }));
        });
        return chai.Assertion.addMethod("notHaveSelector", function(locator, options, continuation) {
            var gen11_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
            continuation = gen2_continuationOrDefault(arguments);
            locator = gen11_arguments[0];
            options = gen11_arguments[1];
            return haveSelector(this, locator, options, gen1_rethrowErrors(continuation, function(gen12_asyncResult) {
                var result;
                result = gen12_asyncResult;
                return continuation(void 0, assert(!result.hasSelector, "expected element '" + locator + "' not " + result.message));
            }));
        });
    };
}).call(this);