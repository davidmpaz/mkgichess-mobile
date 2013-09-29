define([
    'vm',
    'app',
    'jquery',
    'backbone',
    'models/player',
    'libs/cordova/restclient',
    'controllers/BaseController',
    'views/game/games'
], function (Vm, CordovaApp, $, Backbone, PlayerModel, Rest, BaseController, GamesPage) {

    var GameController = BaseController.extend({

        handleGamesRoute: function (options) {
            var settings = this.checkSettings();
            // stop here ! we are going to settings
            if (!settings) return false;

            Rest.getPlayerGames(settings, function (gameCollection) {
                var gamePage = Vm.create(options.appView, 'GamePage', GamesPage,
                    {collection: gameCollection});

                // render and make jquery enhance the html
                gamePage.enhance();
                GameController.processView(options.appView);
            });
        }
    });

    return GameController;
});
