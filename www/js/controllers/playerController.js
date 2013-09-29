define([
    'vm',
    'jquery',
    'backbone',
    'controllers/BaseController'
], function (Vm, $, Backbone, BaseController) {

    var PlayerController = BaseController.extend({

        handleDashboardRoute: function (options) {
            var settings = this.checkSettings(),
                self = this;
            // stop here ! we are going to settings
            if (!settings) return false;

            require([
                'models/player',
                'views/dashboard/page'
            ], function (PlayerModel, DashboardPage) {
                var player = new PlayerModel(settings);

                var dashboardPage = Vm.create(options.appView, 'DashboardPage',
                    DashboardPage,
                    {model: player});

                // render and make jquery enhance the html
                dashboardPage.enhance();
                self.processView(options.appView);
            });
        },
        handleProfileRoute: function (options) {
            var settings = this.checkSettings(),
                self = this;
            // stop here ! we are going to settings
            if (!settings) return false;

            require([
                'models/player',
                'views/player/profile',
                'libs/cordova/restclient'
            ], function (PlayerModel, ProfilePage, Rest) {

                Rest.getPlayer(settings, function (player) {
                    var player = _.extend(settings, player);
                    // server url doesnt come from remote
                    player.set('server', settings.server);

                    var profilePage = Vm.create(options.appView, 'ProfilePage', ProfilePage,
                        {model: player});

                    // update settings/profile
                    self.saveSettings(player.toJSON());

                    // render and make jquery enhance the html
                    profilePage.enhance();
                    PlayerController.processView(options.appView);
                });
            });

        },
        handleSettingsRoute: function (options) {
            var self = this;

            require([
                'models/player',
                'views/settings/settings'
            ], function (PlayerModel, SettingsPage) {

                // get player and view
                var settings = self.loadSettings(),
                    player = new PlayerModel();

                if (settings != null) {
                    player.set(settings);
                }

                var settingsPage = Vm.create(options.appView, 'SettingsPage', SettingsPage,
                    {model: player});

                // render and make jquery enhance the html
                settingsPage.enhance();
                // push the view
                self.processView(options.appView);
            });
        }
    });

    return PlayerController;
});
