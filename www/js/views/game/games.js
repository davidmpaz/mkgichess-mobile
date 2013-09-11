define([
    'jquery',
    'lodash',
    'baseview',
    'events',
    'libs/cordova/data',
    'text!templates/game/gameListPart.html'
], function ($, _, BaseView, Events, mockdata, gameListTemplatePart) {
    var GameListPage = BaseView.extend({
        el: '.page',
        render: function () {
            this.$el.html(this.pageTemplate());
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
