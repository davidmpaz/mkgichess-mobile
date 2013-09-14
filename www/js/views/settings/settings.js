define([
    'jquery',
    'lodash',
    'baseview',
    'app',
    'events',
    'mustache',
    'text!templates/settings/page.html'
], function ($, _, BaseView, CordovaApp, Events, Mustache, settingsPageTemplate) {
    var DashboardPage = BaseView.extend({
        el: '.page',
        events: {
            'click a': function () { this.saveUserData(); }
        },
        render: function () {

            var settings = CordovaApp.loadSettings(),
                tpl = Mustache.render(settingsPageTemplate, settings);

            $(this.el).html(tpl);
        },
        saveUserData: function(){

            var data = _.reduce($('#settings-form').serializeArray(), function(settings, field){
                settings[field.name] = field.value;
                return settings;
            }, {});

            // save new settings merged with old ones
            var settings = CordovaApp.loadSettings();
            CordovaApp.saveSettings(_.extend(settings, data));
        }

    });

    return DashboardPage;
});
