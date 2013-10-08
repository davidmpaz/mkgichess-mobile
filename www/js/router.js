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
            'profile/:id': 'profile',
            'ranking': 'ranking',
            'invitation': 'invitation',
            'game/:id': 'game',

            // Default - catch all
            '*actions': 'defaultAction'
        }
    });

    var initialize = function (options) {
        var appView = options.appView;
        var router = new AppRouter(options);

        router.on('route:defaultAction', function () {
            require(['controllers/playerController'], function (PlayerController) {
                PlayerController.handleDashboardRoute({
                    appView: appView, initialPage: true
                });
            });
        });
        router.on('route:profile', function (id) {
            require(['controllers/playerController'], function (PlayerController) {
                PlayerController.handleProfileRoute({appView: appView, id: id});
            });
        });
        router.on('route:home', function () {
            require(['controllers/playerController'], function (PlayerController) {
                PlayerController.handleDashboardRoute({ appView: appView });
            });
        });
        router.on('route:games', function () {
            require(['controllers/gameController'], function (GameController) {
                GameController.handleGamesRoute({ appView: appView });
            });
        });
        router.on('route:settings', function () {
            require(['controllers/playerController'], function (PlayerController) {
                PlayerController.handleSettingsRoute({appView: appView});
            });
        });
        router.on('route:ranking', function () {
            require(['controllers/playerController'], function (PlayerController) {
                PlayerController.handleRankingRoute({appView: appView});
            });
        });
        router.on('route:invitation', function () {
            require(['controllers/playerController'], function (PlayerController) {
                PlayerController.handleInvitationRoute({appView: appView});
            });
        });
        router.on('route:help', function () {
            require(['views/help/help'], function (HelpPage) {
                var helpPage = Vm.create(appView, 'HelpPage', HelpPage);
                helpPage.fadeIn();
            });
        });
        router.on('route:game', function (id) {
            require(['controllers/gameController'], function (GameController) {
                GameController.handleGameRoute({ appView: appView, game_id: id });
            });
        });
        Backbone.history.start({ pushState: false });
    };
    return {
        initialize: initialize
    };
});
