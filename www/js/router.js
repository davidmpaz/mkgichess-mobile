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
            'games': 'games',
            'settings': 'settings',
            'help': 'help',
            'home': 'home',
            'profile': 'profile',

            // Default - catch all
            '*actions': 'defaultAction'
        }
    });

    var initialize = function (options) {
        var appView = options.appView;
        var router = new AppRouter(options);

        router.on('route:defaultAction', function(){
            require(['controllers/playerController'], function (PlayerController) {
                PlayerController.handleDashboardRoute({
                    appView: appView, initialPage: true
                });
            });
        });
        router.on('route:profile', function(){
            require(['controllers/playerController'], function (PlayerController) {
                PlayerController.handleProfileRoute({appView: appView});
            });
        });
        router.on('route:home', function () {
            require(['views/dashboard/page'], function (DashboardPage) {
                var dashboardPage = Vm.create(appView, 'DashboardPage', DashboardPage, {initialPage: false});
                dashboardPage.fadeIn();
            });
        });
        router.on('route:games', function () {
            require(['views/game/games'], function (GamePage) {
                var gamePage = Vm.create(appView, 'GamePage', GamePage);
                gamePage.fadeIn();
            });
        });
        router.on('route:settings', function () {
            require(['views/settings/settings'], function (SettingsPage) {
                var settingsPage = Vm.create(appView, 'SettingsPage', SettingsPage);
                settingsPage.fadeIn();
            });
        });
        router.on('route:help', function () {
            require(['views/help/help'], function (HelpPage) {
                var helpPage = Vm.create(appView, 'HelpPage', HelpPage);
                helpPage.fadeIn();
            });
        });

        Backbone.history.start({ pushState : false });
    };
    return {
        initialize: initialize
    };
});
