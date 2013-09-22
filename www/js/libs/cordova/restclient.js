define([
    'jquery',
    'lodash',
    'models/player'
], function ($, _, PlayerModel) {
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
         * Get a player by username from REST endpoint
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
        }
    };

    return client;

});