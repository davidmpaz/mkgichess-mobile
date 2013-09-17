define([
    'vm',
    'app',
    'jquery',
    'backbone',
    'models/player',
    'libs/cordova/restclient',
    'views/dashboard/page',
    'views/player/profile',
    'views/settings/settings',
    'controllers/BaseController'
], function (Vm, CordovaApp, $, Backbone, PlayerModel, Rest, DashboardPage, ProfilePage, SettingsPage, BaseController) {

    var PlayerController = BaseController.extend({

        handleDashboardRoute: function (options) {
            var settings = CordovaApp.loadSettings();

            // if not initial page we already saved the data
            if (settings === null && options.initialPage) {
                // got to settings form
                Backbone.history.navigate('#/settings', {trigger: true});
            } else {
                // get player and view
                var player = new PlayerModel(Rest.getPlayer(settings.username)),
                    dashboardPage = Vm.create(options.appView, 'DashboardPage', DashboardPage,
                        {model: player});

                // render and make jquery enhance the html
                dashboardPage.enhance();
                this.processView(options.appView);
            }
        },
        handleProfileRoute: function (options) {
            // get player and view
            var settings = CordovaApp.loadSettings(),
                player = new PlayerModel(Rest.getPlayer(settings.username)),
                profilePage = Vm.create(options.appView, 'ProfilePage', ProfilePage,
                    {model: player});

            // render and make jquery enhance the html
            profilePage.enhance();
            this.processView(options.appView);
        },
        handleSettingsRoute: function (options) {

            // get player and view
            var settings = CordovaApp.loadSettings(),
                player = new PlayerModel(
                    (settings === null) ? {} : Rest.getPlayer(settings.username)
                );
            player.set('server', settings.server);

            var settingsPage = Vm.create(options.appView, 'SettingsPage', SettingsPage,
                    {model: player});

            // render and make jquery enhance the html
            settingsPage.enhance();
            // push the view
            this.processView(options.appView);
        }
    });

    return PlayerController;
});
