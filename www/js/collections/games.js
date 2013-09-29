define([
    'jquery',
    'lodash',
    'backbone',
    'models/game'
], function ($, _, Backbone, gameModel) {
    return Backbone.Collection.extend({
        model: gameModel,
        initialize: function () {

        }

    });
});
