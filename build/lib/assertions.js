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
        return chai.Assertion.addMethod("haveSelector", function(locator, options, continuation) {
            var gen4_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
            continuation = gen2_continuationOrDefault(arguments);
            locator = gen4_arguments[0];
            options = gen4_arguments[1];
            var count, obj, shouldEqual;
            count = void 0;
            if (options) {
                count = options.count;
            }
            obj = this._obj;
            shouldEqual = true;
            if (this.__flags.negate) {
                shouldEqual = false;
            }
            return obj.hasSelector(locator, {
                count: count
            }, gen1_rethrowErrors(continuation, function(gen5_asyncResult) {
                var acceptable, message;
                acceptable = gen5_asyncResult === shouldEqual;
                message = "to exist";
                return gen3_asyncIf(count && !acceptable, function(continuation) {
                    var gen6_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                    continuation = gen2_continuationOrDefault(arguments);
                    return obj.find(locator, gen1_rethrowErrors(continuation, function(gen7_asyncResult) {
                        return continuation(void 0, message = "to have " + count + " occurrences (only " + gen7_asyncResult.length + " found)");
                    }));
                }, gen1_rethrowErrors(continuation, function(gen8_asyncResult) {
                    gen8_asyncResult;
                    return continuation(void 0, this.assert(acceptable, "expected element '" + locator + "' " + message, "expected element '" + locator + "' not " + message, locator, "nothing"));
                }));
            }));
        });
    };
}).call(this);