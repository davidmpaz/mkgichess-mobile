/**
 * This modules handle the game history, Is in charge to, given a Chess.js game, fulfill
 * steps backward and forward as well as start the game or move to the end.
 */
define([
    'underscore',
    'libs/chess/chess'
], function (_, ChessEngine) {

    var history = {
        /**
         * Chess game original instance to handle history to
         */
        game: null,
        /**
         * Cursor to walk the move history
         */
        cursor: null,
        /**
         * Init the history
         * @param game
         * @return this
         */
        initialize: function (game) {
            this.game = game;
            this.cursor = game.history().length;
            return this;
        },
        /**
         * Restart the cursor
         * @return string position to show in chessboard at initial stage
         */
        reset: function () {
            this.cursor = 0;
            return 'start';
        },
        /**
         * Go to the last move of the game
         * @return string The up to date position
         */
        move_last: function () {
            this.cursor = this.game.history().length;
            return this.game.fen();
        },
        /**
         * Move the game an step back
         * @return string The position one move backward
         */
        move_back: function () {
            var tmp = new ChessEngine(),
                moves = this.game.history();

            if(this.cursor == 0) return 'start';

            // walk the entire game again minus one move
            _.each(_.first(moves, this.cursor - 1), function (move) {
                tmp.move(move);
            });

            this.cursor -= 1;

            return tmp.fen();
        },
        /**
         * Move the game an step forward
         * @return string The position one move forward
         */
        move_forward: function () {
            var tmp = new ChessEngine(),
                moves = this.game.history();

            if(this.cursor == moves.length) return this.game.fen();

            // walk the entire game again plus one move
            _.each(_.first(moves, this.cursor + 1), function (move) {
                tmp.move(move);
            });

            this.cursor += 1;

            return tmp.fen();
        }
    };

    return history;
});
