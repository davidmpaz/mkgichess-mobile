define([
    'jquery',
    'baseview',
    'mustache',
    'text!templates/dashboard/page.html'
], function ($, BaseView, Mustache, dashboardPageTemplate) {
    var DashboardPage = BaseView.extend({
        el: '.page',
        initialize: function () {
            this.model.on('change', this.enhance, this)
        },
        render: function () {
            this.$el.html(Mustache.render(dashboardPageTemplate, this.model.toJSON()));
        }
    });

    return DashboardPage;
});
