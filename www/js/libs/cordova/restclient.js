define([
    'jquery',
    'lodash',
    'models/player',
    'models/game',
    'collections/games',
    'collections/players'
], function ($, _, PlayerModel, GameModel, GameCollection, PlayerCollection) {
    var client = {

        initialize: function () {
        },
        /**
         * Get a player by username from REST endpoint
         * @param fn
         * @param options
         */
        getPlayer: function (options, fn) {

            $.ajax({
                url: options.server + '/user/' + options.identifier,
                type: 'get',
                dataType: 'json',
                success: function (user) {
                    // fill with some sensible defaults
                    var player = new PlayerModel(user);
                    if (typeof fn == 'function') fn(player);
                },
                error: function (/*xhr, textStatus, errorThrown*/) {
                    if (typeof fn == 'function') fn(false);
                }
            });
        },
        /**
         * Get a ranking list of username from REST endpoint
         * @param fn
         * @param options
         */
        getRankingPlayers: function (options, fn) {

            $.ajax({
                url: options.server + '/user/ranking',
                type: 'get',
                dataType: 'json',
                success: function (users) {
                    // fill with some sensible defaults
                    var players = new PlayerCollection(users);
                    if (typeof fn == 'function') fn(players);
                },
                error: function (/*xhr, textStatus, errorThrown*/) {
                    if (typeof fn == 'function') fn(false);
                }
            });
        },
        /**
         * Test REST endpoint availability
         * @param fn
         * @param options
         */
        testServer: function (options, fn) {

            $.ajax({
                url: options.server + '/user/ping',
                type: 'get',
                success: function (resutlt) {
                    if (typeof fn == 'function') fn(resutlt);
                },
                error: function (/*xhr, textStatus, errorThrown*/) {
                    if (typeof fn == 'function') fn(false);
                }
            });
        },
        /**
         * Get a player games by username from REST endpoint
         * @param fn
         * @param options
         */
        getPlayerGames: function (options, fn) {

            $.ajax({
                url: options.server + '/user/' + options.identifier + '/games',
                type: 'get',
                dataType: 'json',
                success: function (games) {
                    // fill with some sensible defaults
                    var collection = new GameCollection(games);
                    if (typeof fn == 'function') fn(collection);
                },
                error: function (/*xhr, textStatus, errorThrown*/) {
                    if (typeof fn == 'function') fn(false);
                }
            });
        },
        /**
         * Get a player invitations by username from REST endpoint
         * @param fn
         * @param options
         */
        getPlayerInvitations: function (options, fn) {

            $.ajax({
                url: options.server + '/user/' + options.identifier + '/invitations',
                type: 'get',
                dataType: 'json',
                success: function (invitations) {
                    if (typeof fn == 'function') fn(invitations);
                },
                error: function (/*xhr, textStatus, errorThrown*/) {
                    if (typeof fn == 'function') fn(false);
                }
            });
        }
    };

    return client;

});