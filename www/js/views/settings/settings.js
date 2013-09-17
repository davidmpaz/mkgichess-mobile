define([
    'jquery',
    'lodash',
    'backbone',
    'baseview',
    'app',
    'mustache',
    'text!templates/settings/page.html'
], function ($, _, Backbone, BaseView, CordovaApp, Mustache, settingsPageTemplate) {
    var DashboardPage = BaseView.extend({
        el: '.page',
        events: {
            'click a': 'saveUserData',
            'click #settings-form-submit': 'saveUserData'
        },
        render: function () {

            this.model.set('gender', this.model.get('gender') == 'f');

            var tpl = Mustache.render(settingsPageTemplate, this.model.toJSON());

            $(this.el).html(tpl);
        },
        saveUserData: function(ev){
            ev.preventDefault();

            var data = _.reduce(this.$('#settings-form').serializeArray(), function(settings, field){
                settings[field.name] = field.value;
                return settings;
            }, {});

            // save new settings merged with old ones
            var oldsettings = (CordovaApp.loadSettings() === null ? {} : CordovaApp.loadSettings()),
                newsettings = _.extend(oldsettings, data);
            CordovaApp.saveSettings(newsettings);

            Backbone.history.navigate('#/home', {trigger: true});
        }

    });

    return DashboardPage;
});
