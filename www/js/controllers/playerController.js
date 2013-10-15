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

            if (options.id != null) settings.identifier = options.id;

            require([
                'models/player',
                'views/player/profile',
                'libs/cordova/restclient'
            ], function (PlayerModel, ProfilePage, Rest) {

                Rest.getPlayer(settings, function (player) {

                    // server url doesnt come from remote
                    player.set('server', settings.server);
                    player.set('showPrivate', options.id == null);
                    player.set('gender', player.get('gender') == 'f');
                    player.set('showPrivate', options.id == null);

                    var profilePage = Vm.create(options.appView, 'ProfilePage', ProfilePage,
                        {model: player});

                    // not viewing another player
                    if (options.id == null) {
                        // update settings/profile
                        self.saveSettings(player.toJSON());
                    }

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
                'views/settings/settings',
                'libs/cordova/restclient'
            ], function (PlayerModel, SettingsPage, Rest) {

                // get player and view
                var settings = self.loadSettings(),
                    player = new PlayerModel();

                if (settings != null) {
                    player.set(settings);
                }

                var settingsPage = Vm.create(options.appView, 'SettingsPage', SettingsPage,
                    {model: player});

                // add listener to save user settings
                settingsPage.listenTo(settingsPage, 'settings:save', function (player) {

                    var settings = self.loadSettings(),
                        oldsettings = (settings == null ? {} : settings);
                    // save new settings merged with old ones if any
                    player.set(_.extend(oldsettings, player.toJSON()));

                    // only save if valid player and valid url
                    Rest.testServer({server: player.get('server')}, function (result) {
                        if (result) {
                            // request user and save settings
                            Rest.getPlayer(player.toJSON(), function (remotePlayer) {
                                if (remotePlayer) {
                                    remotePlayer.set('server', player.get('server'));
                                    self.saveSettings(remotePlayer.toJSON());
                                    Backbone.history.navigate('#/home');
                                }
                            });
                        } else {
                            self.showError("Server API url is not valid or server is not reachable");
                        }
                    });
                });

                // render and make jquery enhance the html
                settingsPage.enhance();
                // push the view
                self.processView(options.appView);
            });
        },
        handleRankingRoute: function (options) {
            var self = this;

            require([
                'views/player/ranking',
                'libs/cordova/restclient',

            ], function (RankingPage, Rest) {

                var settings = self.checkSettings();
                // stop here ! we are going to settings
                if (!settings) return false;

                Rest.getRankingPlayers(settings, function (playerCollection) {
                    var rankingPage = Vm.create(options.appView, 'GamePage', RankingPage,
                        {collection: playerCollection});

                    // render and make jquery enhance the html
                    rankingPage.enhance();
                    PlayerController.processView(options.appView);
                });
            });
        },
        handleInvitationRoute: function (options) {
            var self = this;

            require([
                'views/player/invites',
                'libs/cordova/restclient',

            ], function (InvitesPage, Rest) {

                var settings = self.checkSettings();
                // stop here ! we are going to settings
                if (!settings) return false;

                Rest.getPlayerInvitations(settings, function (invitations) {
                    var invitesPage = Vm.create(options.appView, 'InvitePage', InvitesPage,
                        {collection: invitations});

                    // render and make jquery enhance the html
                    invitesPage.enhance();
                    PlayerController.processView(options.appView);
                });
            });
        }
    });

    return PlayerController;
});
