define([
    'jquery',
    'lodash',
    'backbone',
    'app',
    'events',
    'text!templates/settings/page.html'
], function ($, _, Backbone, CordovaApp, Events, settingsPageTemplate) {
    var DashboardPage = Backbone.View.extend({
        el: '.page',
        render: function () {

            var settings = CordovaApp.loadSettings(),
                tpl = _.template(settingsPageTemplate, settings, {variable: 'setting'});

            $(this.el).html(tpl);

            // trigger the viewRendered event to re-enhance the new content added
            Events.trigger('viewRendered');
        },
        events: {
            // navigate to game list
            'swipeleft': function () {
                // save settings on navigating out of page
                this.saveUserData();

                $.mobile.navigate('games');
            },
            // save settings on navigating out of page
            'click a': function () { this.saveUserData(); }
        },
        saveUserData: function(){

            var data = _.reduce($('#settings-form').serializeArray(), function(settings, field){
                settings[field.name] = field.value;
                return settings;
            }, {});

            // save settings
            CordovaApp.saveSettings(data);
        }

    });
    return DashboardPage;
});
