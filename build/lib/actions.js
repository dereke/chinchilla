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
                continuation = gen2_continuationOrDefault(arguments);
                locator = gen4_arguments[0];
                gen3_options = gen4_arguments[1];
                var first;
                first = gen3_options !== void 0 && Object.prototype.hasOwnProperty.call(gen3_options, "first") && gen3_options.first !== void 0 ? gen3_options.first : false;
                return find(locator, gen1_rethrowErrors(continuation, function(gen5_asyncResult) {
                    var el;
                    el = gen5_asyncResult;
                    if (first) {
                        el = $(el[0]);
                    }
                    invoke(el, "click", continuation);
                }));
            },
            select: function(text, gen6_options, continuation) {
                var self = this;
                var gen7_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                continuation = gen2_continuationOrDefault(arguments);
                text = gen7_arguments[0];
                gen6_options = gen7_arguments[1];
                var from;
                from = gen6_options !== void 0 && Object.prototype.hasOwnProperty.call(gen6_options, "from") && gen6_options.from !== void 0 ? gen6_options.from : void 0;
                return find(from, gen1_rethrowErrors(continuation, function(gen8_asyncResult) {
                    var selectElement;
                    selectElement = gen8_asyncResult;
                    return continuation(void 0, selectElement.find("option").each(function(index, option) {
                        if ($(option).text() === text) {
                            selectElement.val($(option).val());
                            return selectElement.change();
                        }
                    }));
                }));
            },
            fillIn: function(locator, gen9_options, continuation) {
                var self = this;
                var gen10_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                continuation = gen2_continuationOrDefault(arguments);
                locator = gen10_arguments[0];
                gen9_options = gen10_arguments[1];
                var withValue;
                withValue = gen9_options !== void 0 && Object.prototype.hasOwnProperty.call(gen9_options, "withValue") && gen9_options.withValue !== void 0 ? gen9_options.withValue : void 0;
                return find(locator, gen1_rethrowErrors(continuation, function(gen11_asyncResult) {
                    var fillElement;
                    fillElement = gen11_asyncResult;
                    fillElement.val(withValue);
                    invoke(fillElement, "change", continuation);
                }));
            }
        };
    };
}).call(this);