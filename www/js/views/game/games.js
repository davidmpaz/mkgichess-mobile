define([
    'jquery',
    'lodash',
    'backbone',
    'events',
    'libs/cordova/data',
    'text!templates/game/gameListPart.html'
], function ($, _, Backbone, Events, mockdata, gameListTemplatePart) {
    var GameListPage = Backbone.View.extend({
        el: '.page',
        render: function () {
            this.$el.html(this.pageTemplate());

            // trigger the viewRendered event to re-enhance the new content added
            Events.trigger('viewRendered');
        },
        pageTemplate: function () {

            var str = '<ul id="game-list" data-role="listview" data-count-theme="c" data-inset="true">';

            if (mockdata.games.length === 0) {
                str += '<li><a href="#/">You currently do not have any games.</a></li>';
            } else {
                var lamp = '', altText = '';
                _.each(mockdata.games, function (g) {

                    if (g.your_turn == 'true') {
                        lamp = 'img/lamp_green.png';
                        altText = 'Your turn.';
                    } else {
                        lamp = 'img/lamp_red.png';
                        altText = 'Opponent turn.';
                    }

                    str += _.template(gameListTemplatePart, {g: g, lamp: lamp, altText: altText});
                });
            }

            str += '</ul>';

            return str;
        }

    });

    return GameListPage;
});
