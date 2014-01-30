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
    var _;
    _ = require("underscore");
    exports.defaultOptions = {
        timeout: 1e3,
        waitBetweenChecks: 20
    };
    exports.waitUntil = function(conditionSatisfied, gen3_options, continuation) {
        var self = this;
        var gen4_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
        continuation = gen2_continuationOrDefault(arguments);
        conditionSatisfied = gen4_arguments[0];
        gen3_options = gen4_arguments[1];
        var scope, options;
        scope = gen3_options !== void 0 && Object.prototype.hasOwnProperty.call(gen3_options, "scope") && gen3_options.scope !== void 0 ? gen3_options.scope : void 0;
        options = gen3_options !== void 0 && Object.prototype.hasOwnProperty.call(gen3_options, "options") && gen3_options.options !== void 0 ? gen3_options.options : void 0;
        var continueWithExecution, actualOptions, maxNumberOfRuns, numberOfRuns, wait;
        continueWithExecution = continuation;
        actualOptions = _.clone(exports.defaultOptions);
        if (scope) {
            _.extend(actualOptions, _.pick(scope, "timeout", "waitBetweenChecks"));
        }
        if (options) {
            _.extend(actualOptions, _.pick(options, "timeout", "waitBetweenChecks"));
        }
        options = actualOptions;
        maxNumberOfRuns = Math.round(options.timeout / options.waitBetweenChecks);
        numberOfRuns = 0;
        wait = function(continuation) {
            var gen5_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
            continuation = gen2_continuationOrDefault(arguments);
            if (numberOfRuns === maxNumberOfRuns) {
                continueWithExecution();
            }
            return conditionSatisfied(options, gen1_rethrowErrors(continuation, function(gen6_asyncResult) {
                var satisfied;
                satisfied = gen6_asyncResult;
                if (satisfied) {
                    return continuation(void 0, continueWithExecution());
                } else {
                    numberOfRuns = numberOfRuns + 1;
                    return continuation(void 0, setTimeout(wait, options.waitBetweenChecks));
                }
            }));
        };
        return wait();
    };
}).call(this);