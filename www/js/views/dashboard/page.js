define([
    'vm',
    'jquery',
    'baseview',
    'mustache',
    'views/player/stats',
    'text!templates/dashboard/page.html'
], function (Vm, $, BaseView, Mustache, StatView, dashboardPageTemplate) {
    var DashboardPage = BaseView.extend({
        el: '.page',
        initialize: function () {
            this.model.on('change', this.enhance, this)
        },
        render: function () {

            this.$el.html(Mustache.render(dashboardPageTemplate, this.model.toJSON()));

            var statView = Vm.create(this, 'StatView', StatView, {model: this.model});
            statView.render();
        }
    });

    return DashboardPage;
});
