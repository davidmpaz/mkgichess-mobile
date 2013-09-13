define([
    'jquery',
    'lodash',
    'backbone',
    'models/player'
], function ($, _, Backbone, playerModel) {
    return Backbone.Collection.extend({
        model: playerModel,
        initialize: function () {

        }

    });
});
