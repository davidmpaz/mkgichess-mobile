define([
    'jquery',
    'baseview',
    'mustache',
    'text!templates/game/gameList.html'
], function ($, BaseView, Mustache, gameListTemplate) {
    var GameListPage = BaseView.extend({
        el: '.page',
        render: function () {
            var tpl = Mustache.render(gameListTemplate, {games: this.collection.toJSON()});
            this.$el.html(tpl);
        }
    });

    return GameListPage;
});
