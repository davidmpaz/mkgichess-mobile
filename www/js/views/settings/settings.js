define([
    'jquery',
    'lodash',
    'baseview',
    'app',
    'events',
    'text!templates/settings/page.html'
], function ($, _, BaseView, CordovaApp, Events, settingsPageTemplate) {
    var DashboardPage = BaseView.extend({
        el: '.page',
        events: {
            'click a': function () { this.saveUserData(); }
        },
        render: function () {

            var settings = CordovaApp.loadSettings(),
                tpl = _.template(settingsPageTemplate, settings, { variable: 'setting' });

            $(this.el).html(tpl);
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
