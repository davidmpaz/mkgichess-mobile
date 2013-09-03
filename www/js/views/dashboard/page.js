define([
    'jquery',
    'lodash',
    'backbone',
    'app',
    'events',
    'text!templates/dashboard/page.html'
], function ($, _, Backbone, CordovaApp, Events, dashboardPageTemplate) {
    var DashboardPage = Backbone.View.extend({
        el: '.page',
        render: function () {

            var settings = CordovaApp.loadSettings();

            if(typeof settings === 'undefined') {
                // got to settings form
                $.mobile.navigate('settings');
            } else {
                $(this.el).html(dashboardPageTemplate);
            }

            // trigger the viewRendered event to re-enhance the new content added
            Events.trigger('viewRendered');
        },
        events: {
            'swipeleft': function () {
                // navigate to game list
                $.mobile.navigate('games');
            }
        }

    });
    return DashboardPage;
});
