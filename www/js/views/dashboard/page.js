define([
    'jquery',
    'lodash',
    'baseview',
    'app',
    'text!templates/dashboard/page.html'
], function ($, _, BaseView, CordovaApp, dashboardPageTemplate) {
    var DashboardPage = BaseView.extend({
        el: '.page',
        render: function () {

            var settings = CordovaApp.loadSettings();

            if(typeof settings === 'undefined') {
                // got to settings form
                $.mobile.navigate('settings');
            } else {
                $(this.el).html(dashboardPageTemplate);
            }
        }
    });
    return DashboardPage;
});
