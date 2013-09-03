// Filename: router.js
define([
    'jquery',
    'underscore',
    'backbone',
    'vm'
], function ($, _, Backbone, Vm) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            // Pages
            'modules': 'modules',
            'optimize': 'optimize',
            'backbone/:section': 'backbone',
            'backbone': 'backbone',
            'manager': 'manager',
            'games': 'games',
            'settings': 'settings',
            'help': 'help',

            // Default - catch all
            '*actions': 'defaultAction'
        }
    });

    var initialize = function (options) {
        var appView = options.appView;
        var router = new AppRouter(options);

        router.on('route:optimize', function () {
            require(['views/optimize/page'], function (OptimizePage) {
                var optimizePage = Vm.create(appView, 'OptimizePage', OptimizePage);
                optimizePage.render();
            });
        });
        router.on('route:defaultAction', function(actions){
            require(['views/dashboard/page'], function (DashboardPage) {
                var dashboardPage = Vm.create(appView, 'DashboardPage', DashboardPage, {actions: actions});
                dashboardPage.render();
                $.mobile.jqmNavigator.pushView(appView, {transition:'slide', showLoadMsg: true});
            });
        });
        router.on('route:modules', function () {
            require(['views/modules/page'], function (ModulePage) {
                var modulePage = Vm.create(appView, 'ModulesPage', ModulePage);
                modulePage.render();
            });
        });
        router.on('route:backbone', function (section) {
            require(['views/backbone/page'], function (BackbonePage) {
                var backbonePage = Vm.create(appView, 'BackbonePage', BackbonePage, {section: section});
                backbonePage.render();
            });
        });
        router.on('route:manager', function () {
            require(['views/manager/page'], function (ManagerPage) {
                var managerPage = Vm.create(appView, 'ManagerPage', ManagerPage);
                managerPage.render();
            });
        });
        router.on('route:games', function () {
            require(['views/game/games'], function (GamePage) {
                var gamePage = Vm.create(appView, 'GamePage', GamePage);
                gamePage.render();
            });
        });
        router.on('route:settings', function () {
            require(['views/settings/settings'], function (SettingsPage) {
                var settingsPage = Vm.create(appView, 'SettingsPage', SettingsPage);
                settingsPage.render();
            });
        });
        router.on('route:help', function () {
            require(['views/help/help'], function (HelpPage) {
                var helpPage = Vm.create(appView, 'HelpPage', HelpPage);
                helpPage.render();
            });
        });

        Backbone.history.start({ pushState : false });
    };
    return {
        initialize: initialize
    };
});
