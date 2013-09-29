define([
    'lodash',
    'backbone'
], function (_, Backbone) {
    var playerModel = Backbone.Model.extend({
        idAttribute: "game_id",
        defaults: {
            "game_id": null, "opponent": "", "your_turn": false, "move_count": 0,
            "last_move": "", pgn: ""
        },
        initialize: function () {
        },
        validate: function (attrs) {
            if(attrs.game_id == null) {
                return 'Game without id instance. All games must have a game_id value';
            }

            if(attrs.opponent == null) {
                return 'Game without opponent instance. All games must have an opponent';
            }
        }


    });

    return playerModel;

});
