define([
    'jquery',
    'lodash',
    'backbone',
    'baseview',
    'app',
    'mustache',
    'libs/cordova/restclient',
    'text!templates/settings/page.html'
], function ($, _, Backbone, BaseView, CordovaApp, Mustache, Rest, settingsPageTemplate) {
    var DashboardPage = BaseView.extend({
        el: '.page',
        events: {
            'click a#test-server': 'testServer',
            'click a': 'saveUserData',
            'click #settings-form-submit': 'saveUserData'
        },
        render: function () {

            this.model.set('gender', this.model.get('gender') == 'f');

            var tpl = Mustache.render(settingsPageTemplate, this.model.toJSON());

            $(this.el).html(tpl);
        },
        testServer: function (ev) {
            ev.preventDefault();

            Rest.testServer({server: this.$('#server').val()}, function (result) {
                if (result) {
                    this.$('.ui-icon-question-sign').
                        addClass('ui-icon-ok').removeClass('ui-icon-question-sign');
                }
            });

            return false;
        },
        saveUserData: function (ev) {
            ev.preventDefault();
            if (ev.currentTarget.id == 'test-server') return false;

            var data = _.reduce(this.$('#settings-form').serializeArray(), function (settings, field) {
                settings[field.name] = field.value;
                return settings;
            }, {});

            // save new settings merged with old ones
            var settings = CordovaApp.loadSettings(),
                oldsettings = (settings === null ? {} : settings),
                newsettings = _.extend(oldsettings, data);
            CordovaApp.saveSettings(newsettings);

            Backbone.history.navigate('#/home', {trigger: true});
        }

    });

    return DashboardPage;
});
