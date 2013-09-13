define([
    'libs/data/data'
], function (data) {
    var client = {

        initialize: function () {
        },
        getPlayer: function (player) {
            return data.players[player];
        }
    };

    return client;

});