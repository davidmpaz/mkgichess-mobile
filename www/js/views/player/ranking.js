define([
    'jquery',
    'baseview',
    'mustache',
    'text!templates/player/ranking.html'
], function ($, BaseView, Mustache, rankingTemplate) {
    var RankingPage = BaseView.extend({
        el: '.page',
        render: function () {
            var tpl = Mustache.render(rankingTemplate, {players: this.collection.toJSON()});
            this.$el.html(tpl);
        }
    });

    return RankingPage;
});
