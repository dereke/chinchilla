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
    exports.waitUntil = function(checkCondition, continuation) {
        var self = this;
        var gen2_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
        continuation = gen1_continuationOrDefault(arguments);
        checkCondition = gen2_arguments[0];
        var wait;
        wait = function() {
            if (checkCondition()) {
                return setTimeout(wait, 20);
            } else {
                continuation();
            }
        };
        return wait();
    };
}).call(this);