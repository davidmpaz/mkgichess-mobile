define([
    'jquery',
    'lodash',
    'baseview',
    'backbone',
    'app',
    'events',
    'text!templates/dashboard/page.html'
], function ($, _, BaseView, Backbone, CordovaApp, Events, dashboardPageTemplate) {
    var DashboardPage = BaseView.extend({
        el: '.page',
        render: function () {

            var settings = CordovaApp.user_settings;
            // if not initial page we already saved the data
            if(settings === null && this.options.initialPage) {
                // got to settings form
                Backbone.history.navigate('settings', {trigger: true});
            } else {
                $(this.el).html(dashboardPageTemplate);
            }
        }
    });
    return DashboardPage;
});
