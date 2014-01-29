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
    var _, finders, actions, query, defaultConfig;
    _ = require("underscore");
    finders = require("./finders");
    actions = require("./actions");
    query = require("./query");
    defaultConfig = {
        timeout: 1e3
    };
    module.exports = function(element, config) {
        var self = this;
        var scope;
        if (!config) {
            config = defaultConfig;
        }
        scope = {
            timeout: config.timeout,
            element: element
        };
        return _.extend(scope, finders(scope), actions(scope), query(scope), module.exports.scope(scope));
    };
    module.exports.scope = function(scope) {
        var self = this;
        return {
            within: function(locator, block, continuation) {
                var self = this;
                var gen3_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                continuation = gen2_continuationOrDefault(arguments);
                locator = gen3_arguments[0];
                block = gen3_arguments[1];
                if (!block) {
                    throw new Error(module.exports.errors.noBlock);
                }
                return scope.find(locator, gen1_rethrowErrors(continuation, function(gen4_asyncResult) {
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