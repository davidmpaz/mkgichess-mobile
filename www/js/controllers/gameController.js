define([
    'vm',
    'jquery',
    'backbone',
    'controllers/BaseController'
], function (Vm, $, Backbone, BaseController) {

    var GameController = BaseController.extend({

        handleGamesRoute: function (options) {
            var self = this;

            require([
                'models/player',
                'views/game/games',
                'libs/cordova/restclient',

            ], function (PlayerModel, GamesPage, Rest) {

                var settings = self.checkSettings();
                // stop here ! we are going to settings
                if (!settings) return false;

                Rest.getPlayerGames(settings, function (gameCollection) {
                    var gamePage = Vm.create(options.appView, 'GamePage', GamesPage,
                        {collection: gameCollection});

                    // render and make jquery enhance the html
                    gamePage.enhance();
                    GameController.processView(options.appView);
                });
            });

        }
    });

    return GameController;
});
