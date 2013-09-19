define(function () {
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

        initialize: function () {
            this.connection = window.openDatabase("chess", "1.0", "MKGIChess Storage", 1000000);
            //this.moves = window.JSON.parse(window.localStorage.getItem("moves"));
            this.createDataStore(null);
        },

        /**
         * Initialize the data store. Create tables if not exist.
         *
         * @param fn Function callback
         */
        createDataStore: function (fn) {
            //check if we have the tables and create it
            var settings = "CREATE TABLE IF NOT EXISTS settings (identifier string, " +
                    "password string, gender char, age integer, server string)",
                games = "CREATE TABLE IF NOT EXISTS games (game_id unique, opponent string, " +
                    "your_turn integer, move_count integer, last_move integer)";


            store.connection.transaction(function (tx) {
                tx.executeSql(games, [], null, fn);
                tx.executeSql(settings, [], null, fn);
            });
        },
        /**
         * Save user settings
         *
         * @param settings  Settings data object
         * @param fn    Function callback
         */
        saveSettings: function (settings, fn) {
            var q = "INSERT OR REPLACE INTO settings (identifier, password, gender, age, server) " +
                "VALUES (?, ?, ?, ?, ?)";

            store.connection.transaction(function (tx) {
                tx.executeSql(q,
                    [settings.identifier, settings.password, settings.gender, settings.age, settings.server],
                    function () {
                        if (typeof fn !== 'undefined') fn();
                    }, fn);
            });
        },
        /**
         * Get user settings
         */
        loadSettings: function (fn) {
            var q = "SELECT * FROM settings";

            store.connection.transaction(function (tx) {
                tx.executeSql(q, [], function (tx2, settings) {
                    // return null error and settings, only one row
                    if (typeof fn !== 'undefined') fn(null, settings.rows);
                }, fn);
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
                        if (typeof fn !== 'undefined') fn();
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
                    if (typeof fn !== 'undefined') fn();
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
                    // return null error and game list
                    if (typeof fn !== 'undefined') fn(null, games.rows);
                }, fn);
            });

        }

    };

    return store;

});