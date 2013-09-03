
define(function(){
    var store = {
        /**
         * Database connection
         *
         * @type Database
         */
        connection: null,
        /**
         * Queue for moves
         *
         * First, moves goes to the queue for being sent to server later when online.
         * Data on queue is a hash with move in long description (SAN notation) and game id.
         */
        moves: [],

        initialize: function(){
            this.connection = window.openDatabase("chess", "1.0", "MKGIChess Storage", 1000000);
            this.moves = window.JSON.parse(window.localStorage.getItem("moves"));
            this.createDataStore(null);
        },

        /**
         * Initialize the data store. Create tables if not exist.
         *
         * @param fn Function callback
         */
        createDataStore: function (fn) {
            //check if we have the tables and create it
            var games = "CREATE TABLE IF NOT EXISTS games (game_id unique, opponent string, " +
                "your_turn integer, move_count integer, last_move integer)";

            store.connection.transaction(function (tx) {
                tx.executeSql(games, [], null, fn);
            });
        },
        /**
         * Add a game to the database.
         *
         * @param game  Game data object
         * @param fn    Function callback
         */
        addGame: function (game, fn) {
            // read from temp buffer
            var q = "INSERT OR REPLACE INTO games (game_id, opponent, your_turn, move_count, last_move) " +
                "VALUES (?, ?, ?, ?, ?)";

            store.connection.transaction(function (tx) {
                tx.executeSql(q,
                    [game.game_id, game.opponent, game.your_turn, game.move_count, game.last_move],
                    function () {
                        //console.info("Inserted game: " + JSON.stringify(game) );
                        if(typeof fn !== 'undefined') fn();
                    }, fn);
            });
        },
        /**
         * Delete a game from database.
         *
         * @param id Number Game identifier
         * @param fn
         */
        removeGame: function (id, fn) {
            var q = "DELETE FROM games WHERE game_id = ?";

            store.connection.transaction(function (tx) {
                tx.executeSql(q, [id], function () {
                    //console.info("Deleted game: " + id);
                    if(typeof fn !== 'undefined') fn();
                }, fn);
            });
        },
        /**
         * Get list of games
         */
        getGames: function (fn) {
            var q = "SELECT * FROM games";

            store.connection.transaction(function (tx) {
                tx.executeSql(q, [], function (tx2, games) {
                    //console.info("Retrieved the games.");
                    //console.info(games);
                    //console.info("Returned rows = " + games.rows.length);

                    // return null error and game list
                    if (typeof fn !== 'undefined') fn(null, games.rows);
                }, fn);
            });

        }

    };

    return store;

});
