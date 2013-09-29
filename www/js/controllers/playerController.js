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
            var settings = this.checkSettings();
            // stop here ! we are going to settings
            if (!settings) return false;

            var player = new PlayerModel(settings);

            var dashboardPage = Vm.create(options.appView, 'DashboardPage',
                DashboardPage,
                {model: player});

            // render and make jquery enhance the html
            dashboardPage.enhance();
            this.processView(options.appView);


        },
        handleProfileRoute: function (options) {
            var settings = this.checkSettings();
            // stop here ! we are going to settings
            if (!settings) return false;


            Rest.getPlayer(settings, function (playerData) {
                var playerData = _.extend(settings, playerData),
                    player = new PlayerModel(playerData);

                var profilePage = Vm.create(options.appView, 'ProfilePage', ProfilePage,
                    {model: player});

                // update settings/profile
                CordovaApp.saveSettings(player.toJSON());

                // render and make jquery enhance the html
                profilePage.enhance();
                PlayerController.processView(options.appView);
            });
        },
        handleSettingsRoute: function (options) {

            // get player and view
            var settings = CordovaApp.loadSettings(),
                player = new PlayerModel();

            if (settings != null) {
                player.set(settings);
            }

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
