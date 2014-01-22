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
    var gen2_rethrowErrors = function(continuation, block) {
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
    var self = this;
    var finders, waitUntil;
    finders = require("./finders");
    waitUntil = require("./waitUntil").waitUntil;
    module.exports = function(element) {
        var self = this;
        var find, invoke;
        find = finders(element).find;
        invoke = function(el, eventName, continuation) {
            el.one(eventName, function(e) {
                if (continuation) {
                    setTimeout(function() {
                        setTimeout(function() {
                            continuation(void 0, e);
                        }, 0);
                    }, 0);
                }
            });
            return el.trigger(eventName);
        };
        return {
            click: function(locator, gen3_options, continuation) {
                var self = this;
                var gen4_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                continuation = gen1_continuationOrDefault(arguments);
                locator = gen4_arguments[0];
                gen3_options = gen4_arguments[1];
                var first;
                first = gen3_options !== void 0 && Object.prototype.hasOwnProperty.call(gen3_options, "first") && gen3_options.first !== void 0 ? gen3_options.first : false;
                var el;
                el = find(locator);
                if (first) {
                    el = $(el[0]);
                }
                invoke(el, "click", continuation);
            },
            select: function(text, gen5_options, continuation) {
                var self = this;
                var gen6_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                continuation = gen1_continuationOrDefault(arguments);
                text = gen6_arguments[0];
                gen5_options = gen6_arguments[1];
                var from;
                from = gen5_options !== void 0 && Object.prototype.hasOwnProperty.call(gen5_options, "from") && gen5_options.from !== void 0 ? gen5_options.from : void 0;
                var selectElement;
                selectElement = find(from);
                return continuation(void 0, selectElement.find("option").each(function(index, option) {
                    if ($(option).text() === text) {
                        selectElement.val($(option).val());
                        return selectElement.change();
                    }
                }));
            },
            fillIn: function(locator, gen7_options, continuation) {
                var self = this;
                var gen8_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                continuation = gen1_continuationOrDefault(arguments);
                locator = gen8_arguments[0];
                gen7_options = gen8_arguments[1];
                var withValue;
                withValue = gen7_options !== void 0 && Object.prototype.hasOwnProperty.call(gen7_options, "withValue") && gen7_options.withValue !== void 0 ? gen7_options.withValue : void 0;
                return waitUntil(function(continuation) {
                    var gen9_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                    continuation = gen1_continuationOrDefault(arguments);
                    return continuation(void 0, find(locator).length === 0);
                }, gen2_rethrowErrors(continuation, function(gen10_asyncResult) {
                    var fillElement;
                    gen10_asyncResult;
                    fillElement = find(locator);
                    fillElement.val(withValue);
                    invoke(fillElement, "change", continuation);
                }));
            }
        };
    };
}).call(this);