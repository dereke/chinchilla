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
            click: function(locator, continuation) {
                var self = this;
                var gen2_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                continuation = gen1_continuationOrDefault(arguments);
                locator = gen2_arguments[0];
                invoke(find(locator), "click", continuation);
            },
            select: function(text, gen3_options, continuation) {
                var self = this;
                var gen4_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                continuation = gen1_continuationOrDefault(arguments);
                text = gen4_arguments[0];
                gen3_options = gen4_arguments[1];
                var from;
                from = gen3_options !== void 0 && Object.prototype.hasOwnProperty.call(gen3_options, "from") && gen3_options.from !== void 0 ? gen3_options.from : void 0;
                var selectElement;
                selectElement = find(from);
                return continuation(void 0, selectElement.find("option").each(function(index, option) {
                    if ($(option).text() === text) {
                        selectElement.val($(option).val());
                        return selectElement.change();
                    }
                }));
            },
            fillIn: function(locator, gen5_options, continuation) {
                var self = this;
                var gen6_arguments = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
                continuation = gen1_continuationOrDefault(arguments);
                locator = gen6_arguments[0];
                gen5_options = gen6_arguments[1];
                var withValue;
                withValue = gen5_options !== void 0 && Object.prototype.hasOwnProperty.call(gen5_options, "withValue") && gen5_options.withValue !== void 0 ? gen5_options.withValue : void 0;
                var fillElement;
                fillElement = find(locator).val(withValue);
                invoke(fillElement, "change", continuation);
            }
        };
    };
}).call(this);