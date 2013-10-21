define([
    'vm',
    'jquery',
    'backbone',
    'events',
    'libs/cordova/datastore',
    'controllers/BaseController'
], function (Vm, $, Backbone, Event, Datastore, BaseController) {

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

                    Datastore.saveGames(gameCollection.toJSON());

                    // render and make jquery enhance the html
                    gamePage.enhance();
                    GameController.processView(options.appView);
                });
            });

        },
        handleGameRoute: function (options) {
            var self = this;

            require([
                'models/game',
                'views/game/board',
                'libs/cordova/datastore',
                'libs/cordova/restclient'
            ], function (GameModel, BoardPage, Datastore, Rest) {

                var settings = self.checkSettings();
                // stop here ! we are going to settings
                if (!settings) return false;

                Datastore.getGame(options.game_id, function (game) {
                    var gamePage = Vm.create(options.appView, 'BoardPage', BoardPage,
                        {model: new GameModel(game)});

                    // render and make jquery enhance the html
                    gamePage.enhance();
                    GameController.processView(options.appView);
                });

                settings.game_id = options.game_id;
                Event.on('board:ondrop', function (payload) {
                    // post move to REST api
                    Rest.makeMove(settings, payload.moveString, function (err) {
                        // handle error
                        alert("Could not make the move: " + err);
                    });

                });
            });
        }
    });

    return GameController;
});
