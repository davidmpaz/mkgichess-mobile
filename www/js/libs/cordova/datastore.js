define([
    'lodash'
],function (_) {
    var store = {
        saveSettings: function (settings) {
            // check settings values before use JSON
            if(settings !== null && typeof settings !== 'undefined') {
                window.localStorage.setItem('settings', window.JSON.stringify(settings));
            }
        },
        loadSettings: function () {

            var settings = window.localStorage.getItem("settings");

            if(settings !== null){
                settings = window.JSON.parse(settings);
            }

            return settings;
        },
        // Store the list of games
        //
        saveGames: function (games) {
            var gamesStore = {};
            _.each(games, function (g)  {
                gamesStore[g.game_id] = g;
            });

            window.localStorage.setItem('games', window.JSON.stringify(gamesStore));
        },
        // Get s single game from list
        //
        getGame: function (id, fn) {
            var games = window.localStorage.getItem("games");
            if(games !== null){
                games = window.JSON.parse(games);
                // return the result
                if (typeof fn !== 'undefined') fn(games[id]);
            }
        },
        // Updates a game in the list
        //
        saveGame: function (game) {
            var games = window.localStorage.getItem("games");
            games[game.game_id] = game;
            window.localStorage.setItem('games', window.JSON.stringify(games));
        },
        // This uses the store to implement a queue of moves made by player when offline
        // Moves is an array of hashes. Get a pending move from queue
        //
        popPendingMove: function (fn) {
            var moves = window.localStorage.getItem("moves");
            if(moves !== null){
                moves = window.JSON.parse(moves);
                if (typeof fn !== 'undefined') fn(moves.shift());
            }

        },
        // This uses the store to implement a queue of moves made by player when offline
        // Moves is an array of hashes. Push a pending move to the queue
        //
        pushPendingMove: function (move) {
            var moves = window.localStorage.getItem("moves");
            moves.push(move);
            window.localStorage.setItem('moves', window.JSON.stringify(moves));
        }


    };

    return store;

});