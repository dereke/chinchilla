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
    exports.waitUntil = function(conditionSatisfied, gen2_options, continuation) {
        var self = this;
        var gen3_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
        continuation = gen1_continuationOrDefault(arguments);
        conditionSatisfied = gen3_arguments[0];
        gen2_options = gen3_arguments[1];
        var scope, timeout, waitBetweenChecks;
        scope = gen2_options !== void 0 && Object.prototype.hasOwnProperty.call(gen2_options, "scope") && gen2_options.scope !== void 0 ? gen2_options.scope : void 0;
        timeout = gen2_options !== void 0 && Object.prototype.hasOwnProperty.call(gen2_options, "timeout") && gen2_options.timeout !== void 0 ? gen2_options.timeout : void 0;
        waitBetweenChecks = gen2_options !== void 0 && Object.prototype.hasOwnProperty.call(gen2_options, "waitBetweenChecks") && gen2_options.waitBetweenChecks !== void 0 ? gen2_options.waitBetweenChecks : 20;
        var maxNumberOfRuns, numberOfRuns, wait;
        if (!timeout && scope) {
            timeout = scope.timeout;
        }
        if (!timeout) {
            timeout = 1e3;
        }
        maxNumberOfRuns = Math.round(timeout / waitBetweenChecks);
        numberOfRuns = 0;
        wait = function() {
            if (numberOfRuns === maxNumberOfRuns) {
                continuation();
            }
            if (!conditionSatisfied()) {
                numberOfRuns = numberOfRuns + 1;
                return setTimeout(wait, waitBetweenChecks);
            } else {
                continuation();
            }
        };
        return wait();
    };
}).call(this);