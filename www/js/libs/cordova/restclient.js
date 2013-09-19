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

            $.get(options.server + '/user/' + options.identifier, function (user) {
                // fill with some sensible defaults
                var player = new PlayerModel();
                player.set(user);

                if (typeof fn == 'function') fn(user);
            });
        }
    };

    return client;

});