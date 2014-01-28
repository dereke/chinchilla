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
    var _, finders, actions, query;
    _ = require("underscore");
    finders = require("./finders");
    actions = require("./actions");
    query = require("./query");
    module.exports = function(element) {
        var self = this;
        return _.extend({}, finders(element), actions(element), query(element), module.exports.scope(element));
    };
    module.exports.scope = function(element) {
        var self = this;
        var find, scope;
        find = finders(element).find;
        return scope = {
            within: function(locator, block, continuation) {
                var self = this;
                var gen3_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                continuation = gen2_continuationOrDefault(arguments);
                locator = gen3_arguments[0];
                block = gen3_arguments[1];
                if (!block) {
                    throw new Error(module.exports.errors.noBlock);
                }
                return find(locator, gen1_rethrowErrors(continuation, function(gen4_asyncResult) {
                    var element;
                    element = gen4_asyncResult;
                    return block(module.exports(element), continuation);
                }));
            }
        };
    };
    module.exports.errors = {
        noBlock: "You must call this with a block"
    };
}).call(this);