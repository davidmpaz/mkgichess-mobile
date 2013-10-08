define([
    'jquery',
    'baseview',
    'mustache',
    'events',
    'libs/chess/chess',
    'libs/chess/mkgiboard',
    'libs/chess/gamehistory',
    'text!templates/game/board.html'
], function ($, BaseView, Mustache, Event, ChessEngine, ChessBoard, History, boardTemplate) {

    var BoardPage = BaseView.extend({
        el: '.page',
        history: null,
        game: new ChessEngine(),
        initialize: function () {
            this.listenTo(Event, 'board:ondrop', this.highlights)
        },
        events: {
            'click a#reset': 'reset',
            'click a#back': 'backward',
            'click a#forward': 'forward',
            'click a#end': 'end',
            'board:ondrop': 'highlights'
        },
        render: function () {
            var tpl = Mustache.render(boardTemplate, this.model.toJSON());

            // init engine
            this.game.load_pgn(this.model.get('pgn'));
            // attache model data to use in board module
            this.game.model = this.model;
            // init the history
            this.history = History.initialize(this.game);
            // render html template
            this.$el.html(tpl);

            var cfg = {
                orientation: this.model.get('your_color') || 'white',
                pieceTheme: 'img/chesspieces/wcg/{piece}.png'
            };
            // init board
            ChessBoard.initialize('board', this.game, cfg);
        },
        removeHighlights: function (color) {
            this.$('#board').find('.square-55d63').removeClass('highlight-' + color);
        },
        highlights: function (payload) {
            // Highlighting
            var color = (this.game.turn() == 'w') ? 'white' : 'black';
            this.removeHighlights(color);
            this.$('#board').find('.square-' + payload.move.from).addClass('highlight-' + color);
            this.$('#board').find('.square-' + payload.move.to).addClass('highlight-' + color);
        },
        // Take care of game history
        //
        reset: function () {
            ChessBoard.position(this.history.reset());
            return false;
        },
        backward: function () {
            ChessBoard.position(this.history.move_back());
            return false;
        },
        forward: function () {
            ChessBoard.position(this.history.move_forward());
            return false;
        },
        end: function () {
            ChessBoard.position(this.history.move_last());
            return false;
        }
    });

    return BoardPage;
})
;
