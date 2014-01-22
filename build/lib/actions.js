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
            click: function(locator, gen2_options, continuation) {
                var self = this;
                var gen3_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                continuation = gen1_continuationOrDefault(arguments);
                locator = gen3_arguments[0];
                gen2_options = gen3_arguments[1];
                var first;
                first = gen2_options !== void 0 && Object.prototype.hasOwnProperty.call(gen2_options, "first") && gen2_options.first !== void 0 ? gen2_options.first : false;
                var el;
                el = find(locator);
                if (first) {
                    el = $(el[0]);
                }
                invoke(el, "click", continuation);
            },
            select: function(text, gen4_options, continuation) {
                var self = this;
                var gen5_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                continuation = gen1_continuationOrDefault(arguments);
                text = gen5_arguments[0];
                gen4_options = gen5_arguments[1];
                var from;
                from = gen4_options !== void 0 && Object.prototype.hasOwnProperty.call(gen4_options, "from") && gen4_options.from !== void 0 ? gen4_options.from : void 0;
                var selectElement;
                selectElement = find(from);
                return continuation(void 0, selectElement.find("option").each(function(index, option) {
                    if ($(option).text() === text) {
                        selectElement.val($(option).val());
                        return selectElement.change();
                    }
                }));
            },
            fillIn: function(locator, gen6_options, continuation) {
                var self = this;
                var gen7_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                continuation = gen1_continuationOrDefault(arguments);
                locator = gen7_arguments[0];
                gen6_options = gen7_arguments[1];
                var withValue;
                withValue = gen6_options !== void 0 && Object.prototype.hasOwnProperty.call(gen6_options, "withValue") && gen6_options.withValue !== void 0 ? gen6_options.withValue : void 0;
                var fill;
                fill = function() {
                    var fillElement;
                    fillElement = find(locator);
                    if (fillElement.length === 0) {
                        console.log("wait");
                        return setTimeout(fill, 20);
                    } else {
                        fillElement.val(withValue);
                        invoke(fillElement, "change", continuation);
                    }
                };
                return fill();
            }
        };
    };
}).call(this);