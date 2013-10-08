define([
    'jquery',
    'underscore',
    'events',
    'libs/chess/chessboard'
], function ($, _, Event, Chessboard) {
    /**
     * Chess engine game instance with game data from remote api
     * @type {Chess}
     */
    var game = null;
    /**
     * The board to use on the game
     * @type {Chessboard}
     */
    var board = null;
    /**
     * To build the long move string
     */
    var moveString = '';

    return {
        initialize: function (el, gameRef, config) {
            game = gameRef;
            var cfg = _.extend({
                draggable: true,
                position: game.fen(),
                //sparePieces: true,
                onDragStart: this.onDragStart,
                onDrop: this.onDrop,
                onSnapEnd: this.onSnapEnd
            }, config);

            board = new Chessboard(el, cfg);
            this.position = board.position;
        },
        // Take care of board UI
        // according to ChessboardJS examples
        //
        // do not pick up pieces if the game is over
        // only pick up pieces for the side to move
        onDragStart: function (source, piece) {
            if (game.game_over() === true ||
                (game.model.get('your_color') === 'white' && piece.search(/^b/) !== -1) ||
                (game.model.get('your_color') === 'black' && piece.search(/^w/) !== -1)) {
                return false;
            }

            moveString = "" + piece.charAt(1);
            return true;
        },
        onDrop: function (source, target) {
            // TODO handle promotions to other piece than Queen
            // see if the move is legal
            var move = game.move({
                from: source,
                to: target,
                promotion: 'q' // NOTE: always promote to a queen for example simplicity
            });

            // illegal move
            if (move === null) return 'snapback';

            moveString += source + '-' + target;

            // dispath event board:ondrop with moveString as payload
            Event.trigger('board:ondrop', {move: move, moveString: moveString});
            return true;
        },
        // update the board position after the piece snap
        // for castling, en passant, pawn promotion
        onSnapEnd: function () {
            board.position(game.fen());
        },
        updateStatus: function () {
            // TODO dispatch events for game status
            var status = '';

            var moveColor = 'White';
            if (game.turn() === 'b') {
                moveColor = 'Black';
            }

            // checkmate?
            if (game.in_checkmate() === true) {
                Event.trigger('chess:checkmate', 'Game over, ' + moveColor + ' is in checkmate.');
            }

            // draw?
            else if (game.in_draw() === true) {
                Event.trigger('chess:draw', 'Game over, drawn position');
            }

            // game still on
            else {
                status = moveColor + ' to move';

                // check?
                if (game.in_check() === true) {
                    status += ', ' + moveColor + ' is in check';
                    Event._trigger('chess:check', status);
                }
            }

            //statusEl.html(status);
            //fenEl.html(game.fen());
            //view.$('#pgn').html(game.pgn());
        }
    }
});
