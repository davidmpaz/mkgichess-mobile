define([
    'jquery',
    'baseview',
    'mustache',
    'libs/cordova/data',
    'text!templates/game/gameList.html'
], function ($, BaseView, Mustache, mockdata, gameListTemplate) {
    var GameListPage = BaseView.extend({
        el: '.page',
        render: function () {

            var tpl = Mustache.render(gameListTemplate, mockdata);
            this.$el.html(tpl);
        }
    });

    return GameListPage;
});
