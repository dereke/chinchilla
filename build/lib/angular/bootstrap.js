(function() {
    var self = this;
    var createElement;
    createElement = function(gen1_options) {
        var html;
        html = gen1_options !== void 0 && Object.prototype.hasOwnProperty.call(gen1_options, "html") && gen1_options.html !== void 0 ? gen1_options.html : "<div></div>";
        var appContainer;
        appContainer = $("div#angularApp");
        if (appContainer.length === 0) {
            appContainer = $('<div id="angularApp"></div>').appendTo($(document.body));
        }
        appContainer.empty().nextAll().remove();
        return $(html).appendTo(appContainer);
    };
    module.exports.bootstrapAngular = function(applicationName, gen2_options) {
        var self = this;
        var html, configure, testSetup, run, angularDependencies;
        html = gen2_options !== void 0 && Object.prototype.hasOwnProperty.call(gen2_options, "html") && gen2_options.html !== void 0 ? gen2_options.html : void 0;
        configure = gen2_options !== void 0 && Object.prototype.hasOwnProperty.call(gen2_options, "configure") && gen2_options.configure !== void 0 ? gen2_options.configure : void 0;
        testSetup = gen2_options !== void 0 && Object.prototype.hasOwnProperty.call(gen2_options, "testSetup") && gen2_options.testSetup !== void 0 ? gen2_options.testSetup : void 0;
        run = gen2_options !== void 0 && Object.prototype.hasOwnProperty.call(gen2_options, "run") && gen2_options.run !== void 0 ? gen2_options.run : void 0;
        angularDependencies = gen2_options !== void 0 && Object.prototype.hasOwnProperty.call(gen2_options, "angularDependencies") && gen2_options.angularDependencies !== void 0 ? gen2_options.angularDependencies : [];
        var testModuleName, rootElement, application, element, modules, injector;
        testModuleName = "Test" + applicationName;
        rootElement = createElement({
            html: html
        });
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
            element = angular.element(rootElement[0]);
            modules = [ testModuleName ];
            modules.unshift([ "$provide", function($provide) {
                $provide.value("$rootElement", element);
                return void 0;
            } ]);
            modules.unshift("ng");
            injector = angular.injector(modules);
            if (testSetup) {
                injector.invoke(testSetup);
            }
            return injector.invoke(function($rootScope, $rootElement, $compile, $animate) {
                return $rootScope.$apply(function() {
                    element.data("$injector", injector);
                    $compile($rootElement)($rootScope);
                    return injector.invoke(run);
                });
            });
        } else {
            return console.log("You probably meant to supply a run block");
        }
    };
}).call(this);