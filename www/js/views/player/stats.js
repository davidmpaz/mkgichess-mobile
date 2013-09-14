define([
    'jquery',
    'baseview',
    'mustache',
    'text!templates/player/stats.html',
], function ($, BaseView, Mustache, statsPageTemplate) {
    var StatPage = BaseView.extend({
        el: 'div#stat-container',
        render: function () {
            this.$el.html(Mustache.render(statsPageTemplate, this.model.toJSON()));
        }
    });

    return StatPage;
});
