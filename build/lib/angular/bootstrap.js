(function() {
    var self = this;
    var createElement;
    createElement = function() {
        var appContainer, html;
        appContainer = $("div#angularApp");
        if (appContainer.length === 0) {
            appContainer = $('<div id="angularApp"></div>').appendTo($(document.body));
        }
        appContainer.empty().nextAll().remove();
        html = "<div></div>";
        return $(html).appendTo(appContainer);
    };
    module.exports.bootstrapAngular = function(applicationName, gen1_options) {
        var self = this;
        var configure, run, angularDependencies;
        configure = gen1_options !== void 0 && Object.prototype.hasOwnProperty.call(gen1_options, "configure") && gen1_options.configure !== void 0 ? gen1_options.configure : void 0;
        run = gen1_options !== void 0 && Object.prototype.hasOwnProperty.call(gen1_options, "run") && gen1_options.run !== void 0 ? gen1_options.run : void 0;
        angularDependencies = gen1_options !== void 0 && Object.prototype.hasOwnProperty.call(gen1_options, "angularDependencies") && gen1_options.angularDependencies !== void 0 ? gen1_options.angularDependencies : [];
        var testModuleName, rootElement, application, injector;
        testModuleName = "Test" + applicationName;
        rootElement = createElement();
        angularDependencies.push(applicationName);
        console.log("Booting application " + angularDependencies.join(","));
        application = angular.module(testModuleName, angularDependencies);
        application.factory("continuation", function() {
            return void 0;
        });
        if (configure) {
            configure(application, rootElement);
        } else {
            console.log("You may want to supply a configuration block");
        }
        if (run) {
            injector = angular.bootstrap(rootElement[0], [ testModuleName ]);
            return setTimeout(function() {
                return injector.invoke(run);
            }, 0);
        } else {
            return console.log("You probably meant to supply a run block");
        }
    };
}).call(this);