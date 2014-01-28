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
    var finders;
    finders = require("./finders");
    module.exports = function(element) {
        var self = this;
        var find;
        find = finders(element).find;
        return {
            isVisible: function(locator, continuation) {
                var self = this;
                var gen3_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                continuation = gen2_continuationOrDefault(arguments);
                locator = gen3_arguments[0];
                return find(locator, gen1_rethrowErrors(continuation, function(gen4_asyncResult) {
                    return continuation(void 0, gen4_asyncResult.is(":visible"));
                }));
            },
            hasSelector: function(locator, continuation) {
                var self = this;
                var gen5_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                continuation = gen2_continuationOrDefault(arguments);
                locator = gen5_arguments[0];
                return find(locator, gen1_rethrowErrors(continuation, function(gen6_asyncResult) {
                    return continuation(void 0, gen6_asyncResult.length > 0);
                }));
            }
        };
    };
}).call(this);